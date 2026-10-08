# Báo cáo đánh giá bảo mật: Gateway JWT Filter & OpenFeign Forum->User

**Dự án**: Smart Agriculture Management System  
**Ngày thực hiện**: 2026-10-07  
**Phạm vi đánh giá (Scope)**: Read-only security audit các thay đổi tại 3 worktrees:
1. `t1-auth-jwt-claims` (`backend/auth-service`)
2. `t2-gateway-jwt` (`backend/api-gateway`)
3. `t3-feign-forum-user` (`backend/forum-service`, `backend/user-service`)

---

## 1. Kết luận chung (Executive Summary & Recommendation)

### **Khuyến nghị hợp nhất (Merge Readiness): FAIL (KHÔNG ĐẠT ĐIỀU KIỆN MERGE VÀO PRODUCTION)**

Bộ thay đổi triển khai kiến trúc xác thực tập trung tại API Gateway (Trust Model A) và giao tiếp đồng bộ qua OpenFeign giữa Forum Service và User Service. Mặc dù cấu trúc tổng thể đã đi đúng hướng và có những điểm tích cực (như việc che giấu dữ liệu PII trong `UserProfileViewDTO`), việc review mã nguồn chuyên sâu phát hiện **1 lỗ hổng nghiêm trọng (Critical)**, **3 lỗ hổng mức cao (High)**, **2 lỗ hổng mức trung bình (Medium)**, và các rủi ro tồn dư cấu trúc mạng nghiêm trọng cần được khắc phục trước khi đưa vào vận hành.

---

## 2. Bảng tổng hợp các phát hiện bảo mật (Findings Summary)

| ID | Tiêu đề phát hiện | Mức độ nghiêm trọng | Thành phần / Tệp tin ảnh hưởng | Trạng thái đề xuất |
|---|---|---|---|---|
| **SEC-01** | Insecure Defaults (`defaultValue = "1"`) kết hợp thiếu validate `userId` claim dẫn đến **chiếm đoạt tài khoản User ID 1 (Admin)** | **CRITICAL** | `JwtAuthenticationGlobalFilter.java`, `UserProfileController.java`, `FarmLocationController.java`, `FarmPlotController.java`, `NotificationController.java` | Block Merge |
| **SEC-02** | Lọc header thiếu sót: Khách hàng có thể giả mạo `X-Roles` và `X-Username` qua Gateway | **HIGH** | `JwtAuthenticationGlobalFilter.java` | Block Merge |
| **SEC-03** | Chặn toàn bộ CORS Preflight (HTTP `OPTIONS`) dẫn đến gãy kết nối trình duyệt | **HIGH** | `JwtAuthenticationGlobalFilter.java` | Block Merge |
| **SEC-04** | Hardcoded JWT Secret trong git, không đồng bộ biến môi trường giữa Docker & Service | **HIGH** | `application.yml` (gateway, auth), `docker-compose.yml` | Block Merge |
| **SEC-05** | Lỗ hổng Whitelist đường dẫn công khai & Gãy logic tại `POST /api/auth/logout` | **MEDIUM** | `JwtAuthenticationGlobalFilter.java`, `AuthController.java` | Cần sửa |
| **SEC-06** | Feign chuyển tiếp danh tính người gọi sai ngữ cảnh (Confused Deputy) & Nguy cơ N+1 DoS | **MEDIUM** | `FeignHeaderForwardingConfiguration.java`, `ForumService.java`, `UserProfileClient.java` | Cần sửa |
| **SEC-07** | Rủi ro tồn dư của Trust Model A: Eureka lộ lọt không bảo vệ, mạng Docker phẳng | **HIGH** (Kiến trúc) | `docker-compose.yml`, `discovery-service/application.yml` | Khắc phục hạ tầng |
| **SEC-08** | Thiếu chuẩn hóa phản hồi lỗi token RFC 6750 (`WWW-Authenticate`) và ghi log bảo mật | **LOW** | `JwtAuthenticationGlobalFilter.java` | Khuyến nghị cải tiến |

---

## 3. Phân tích chi tiết từng phát hiện (Detailed Findings)

### SEC-01 [CRITICAL]: Insecure Defaults (`defaultValue = "1"`) kết hợp thiếu validate `userId` claim

- **Tệp tin liên quan**:
  - `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java` (dòng 68, 71-73)
  - `backend/user-service/src/main/java/com/agriculture/user/controller/UserProfileController.java` (dòng 18, 30)
  - `backend/user-service/src/main/java/com/agriculture/user/controller/FarmLocationController.java` (dòng 20, 25)
  - `backend/crop-service/src/main/java/com/agriculture/crop/controller/FarmPlotController.java` (dòng 20, 25)
  - `backend/notification-service/src/main/java/com/agriculture/notification/controller/NotificationController.java` (dòng 19, 24)

- **Cơ chế kỹ thuật**:
  1. Trong `JwtAuthenticationGlobalFilter.java`:
     ```java
     Object userId = firstClaim(claims, "userId", "id");
     if (userId != null) {
         headers.set(USER_ID_HEADER, userId.toString());
     }
     ```
     Khi token JWT hợp lệ nhưng không chứa claim `userId` (hoặc `id`), bộ lọc Gateway **không hề từ chối request** mà chỉ đơn giản là bỏ qua việc gán header `X-User-Id`.
  2. Tại các microservice phía sau (`user-service`, `crop-service`, `notification-service`), các controller vẫn đang cấu hình:
     ```java
     @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId
     ```
  3. Mặc dù tại `forum-service` (T3), lập trình viên đã sửa thành `@RequestHeader("X-User-Id") Long userId`, các dịch vụ còn lại vẫn giữ nguyên giá trị mặc định `1`.

- **Mức độ ảnh hưởng (Impact)**:
  Bất kỳ người dùng nào có token không chứa claim `userId` (hoặc gửi request trực tiếp không có header này vào mạng nội bộ) đều được hệ thống tự động coi là **User ID 1** (thường là tài khoản Quản trị viên/Admin đầu tiên). Kẻ tấn công có thể xem và sửa đổi toàn bộ thông tin profile của Admin (`PUT /api/users/profile`), quản lý nông trại, cập nhật cây trồng và đọc thông báo nhạy cảm của Admin.

- **Biện pháp khắc phục (Remediation)**:
  1. **Tại API Gateway**: Kiểm tra bắt buộc: nếu `userId == null` hoặc rỗng trên các route được bảo vệ, trả về ngay lập tức HTTP 401 Unauthorized:
     ```java
     Object userId = firstClaim(claims, "userId", "id");
     if (userId == null) {
         return unauthorized(exchange);
     }
     ```
  2. **Tại toàn bộ Microservices**: Xóa bỏ hoàn toàn thuộc tính `required = false, defaultValue = "1"` trên tất cả các controller. Luôn khai báo `@RequestHeader("X-User-Id") Long userId`.

---

### SEC-02 [HIGH]: Lọc header thiếu sót: Khách hàng có thể giả mạo `X-Roles` và `X-Username`

- **Tệp tin liên quan**:
  - `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java` (dòng 37, 66-80, 99-101)

- **Cơ chế kỹ thuật**:
  1. Hàm loại bỏ header của Gateway được cài đặt như sau:
     ```java
     private static boolean isUserHeader(String headerName) {
         return headerName.regionMatches(true, 0, "X-User-", 0, 7);
     }
     ```
  2. Thuật toán trên chỉ so khớp các header bắt đầu bằng tiền tố `"X-User-"` (độ dài 7 ký tự).
     - `"X-Username"`: 7 ký tự đầu là `"X-Usern"` (ký tự thứ 7 là `'n'`, không phải `'-'`) $\rightarrow$ **KHÔNG KHỚP** $\rightarrow$ **KHÔNG BỊ XÓA**!
     - `"X-Roles"`: 7 ký tự đầu là `"X-Role"` $\rightarrow$ **KHÔNG KHỚP** $\rightarrow$ **KHÔNG BỊ XÓA**!
  3. Khi xử lý claims từ JWT:
     ```java
     Object roles = claims.get("roles");
     if (roles != null) {
         headers.set(ROLES_HEADER, formatRoles(roles));
     }
     ```
     Nếu token không có claim `roles` (hoặc giá trị null), khối lệnh trên bị bỏ qua, và header `X-Roles: ROLE_ADMIN` do client tự gắn trong request sẽ được gửi thẳng tới microservice backend!
  4. Đối với mọi đường dẫn công khai (Public Path như `/api/auth/**`), request sau khi lọc được chuyển tiếp ngay lập tức (`chain.filter(sanitizedExchange)`), khiến client có thể đính kèm tùy ý `X-Roles` và `X-Username`.

- **Mức độ ảnh hưởng (Impact)**:
  Nguy cơ leo thang đặc quyền (Privilege Escalation). Kẻ tấn công có thể giả mạo vai trò quản trị viên (`X-Roles: ROLE_ADMIN`) hoặc danh tính người dùng (`X-Username: victim_user`) vượt qua Gateway.

- **Biện pháp khắc phục (Remediation)**:
  Cấu hình danh sách tường minh các header danh tính cần xóa sạch trước khi định tuyến:
  ```java
  private static final Set<String> UNTRUSTED_IDENTITY_HEADERS = Set.of(
      "x-user-id", "x-username", "x-roles"
  );
  
  private static boolean isIdentityHeader(String headerName) {
      String lower = headerName.toLowerCase(Locale.ROOT);
      return UNTRUSTED_IDENTITY_HEADERS.contains(lower) || lower.startsWith("x-user-");
  }
  ```
  Đồng thời, nếu claim `roles` không tồn tại trong token, hãy chủ động xóa hoặc gán chuỗi rỗng cho header `X-Roles`.

---

### SEC-03 [HIGH]: Chặn toàn bộ CORS Preflight (HTTP `OPTIONS`) dẫn đến gãy kết nối trình duyệt

- **Tệp tin liên quan**:
  - `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java` (dòng 45-48, 87-89)

- **Cơ chế kỹ thuật**:
  - `JwtAuthenticationGlobalFilter` có thứ tự ưu tiên cao nhất (`Ordered.HIGHEST_PRECEDENCE`), chạy trước tất cả các bộ lọc xử lý CORS của Spring Cloud Gateway.
  - Khi trình duyệt (ví dụ: Frontend Next.js trên cổng 3000 gọi API Gateway cổng 8080) thực hiện request cross-origin với method non-simple (POST, PUT, DELETE hoặc có header tùy biến), trình duyệt sẽ gửi request Preflight HTTP `OPTIONS`.
  - Theo chuẩn W3C CORS, request preflight `OPTIONS` **không bao giờ đính kèm header `Authorization`**.
  - Bộ lọc kiểm tra:
    ```java
    String authorization = requestWithoutClientIdentity.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
    if (authorization == null || !authorization.regionMatches(true, 0, "Bearer ", 0, 7)) {
        return unauthorized(exchange);
    }
    ```
    Do `authorization == null`, Gateway lập tức trả về HTTP 401 Unauthorized!

- **Mức độ ảnh hưởng (Impact)**:
  Toàn bộ các tác vụ gọi API từ trình duyệt của người dùng (Next.js) đến các endpoint được bảo vệ sẽ bị trình duyệt chặn hoàn toàn do lỗi CORS Preflight Failed (401).

- **Biện pháp khắc phục (Remediation)**:
  Cho phép request HTTP `OPTIONS` đi qua mà không cần xác thực token:
  ```java
  if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
      return chain.filter(exchange);
  }
  ```

---

### SEC-04 [HIGH]: Hardcoded JWT Secret trong git, không đồng bộ biến môi trường giữa Docker & Service

- **Tệp tin liên quan**:
  - `backend/api-gateway/src/main/resources/application.yml` (dòng 7)
  - `backend/auth-service/src/main/resources/application.yml` (dòng 26)
  - `docker-compose.yml` (dòng 96-98, 113)

- **Cơ chế kỹ thuật**:
  1. Khóa bí mật mặc định `926D96C90030DD58429D2751AC1BDBBC926D96C90030DD58429D2751AC1BDBBC` được hardcode công khai trong tệp cấu hình git (CWE-798).
  2. Bất đối xứng trong `docker-compose.yml`:
     - `auth-service` nhận biến môi trường: `- APP_JWT_SECRET=${JWT_SECRET}`.
     - `api-gateway` **hoàn toàn không được cấu hình biến môi trường này**!
  3. Trong `auth-service/src/main/resources/application.yml`:
     Giá trị `app.jwt.secret: 926D9...` không sử dụng cú pháp placeholder `${APP_JWT_SECRET:...}`.

- **Mức độ ảnh hưởng (Impact)**:
  - Nếu triển khai môi trường sản xuất bằng thiết lập mặc định, kẻ tấn công biết mã nguồn có thể tự ký token HMAC-SHA256 với bất kỳ quyền hạn nào và vượt qua Gateway.
  - Khi quản trị viên cấu hình `JWT_SECRET` mới trong tệp `.env`, `auth-service` sẽ dùng secret mới để ký token, trong khi `api-gateway` vẫn dùng secret mặc định cũ $\rightarrow$ Toàn bộ token phát hành bởi `auth-service` đều bị Gateway từ chối (401).

- **Biện pháp khắc phục (Remediation)**:
  1. Cấu hình đồng bộ trong `docker-compose.yml`:
     ```yaml
     api-gateway:
       environment:
         - APP_JWT_SECRET=${JWT_SECRET}
     auth-service:
       environment:
         - APP_JWT_SECRET=${JWT_SECRET}
     ```
  2. Cập nhật `auth-service/src/main/resources/application.yml`:
     `secret: ${APP_JWT_SECRET:926D9...}`
  3. Bắt buộc tạo bí mật ngẫu nhiên mạnh tại thời điểm deploy và từ chối khởi động ứng dụng nếu phát hiện bí mật mặc định.

---

### SEC-05 [MEDIUM]: Lỗ hổng Whitelist đường dẫn công khai & Gãy logic tại `POST /api/auth/logout`

- **Tệp tin liên quan**:
  - `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java` (dòng 91-97)
  - `backend/auth-service/src/main/java/com/agriculture/auth/controller/AuthController.java` (dòng 136-142)
  - `backend/auth-service/src/main/java/com/agriculture/auth/security/WebSecurityConfig.java` (dòng 56-58)

- **Cơ chế kỹ thuật**:
  - Gateway whitelist toàn bộ prefix: `path.startsWith("/api/auth/")`.
  - Endpoint `POST /api/auth/logout` trong `AuthController` là tác vụ cần xác thực:
    ```java
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Long userId = userDetails.getId();
    refreshTokenService.deleteByUserId(userId);
    ```
  - Do Gateway coi toàn bộ `/api/auth/**` là public, request không token được chuyển thẳng tới `auth-service`. Tại đây, `SecurityContextHolder` chỉ chứa đối tượng nặc danh (`AnonymousAuthenticationToken`), dẫn tới lỗi `ClassCastException` / 500 Internal Server Error.
  - Ngoài ra, whitelist dạng wildcard rộng mở nguy cơ cho bất kỳ endpoint nhạy cảm nào được thêm vào package auth trong tương lai.

- **Biện pháp khắc phục (Remediation)**:
  Chỉ whitelist chính xác các endpoint công khai:
  ```java
  private static final Set<String> PUBLIC_EXACT_PATHS = Set.of(
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/refresh",
      "/error"
  );
  ```
  Đưa `/api/auth/logout` ra khỏi danh sách whitelist công khai và yêu cầu token hợp lệ.

---

### SEC-06 [MEDIUM]: Feign chuyển tiếp danh tính người gọi sai ngữ cảnh (Confused Deputy) & Nguy cơ N+1 DoS

- **Tệp tin liên quan**:
  - `backend/forum-service/src/main/java/com/agriculture/forum/config/FeignHeaderForwardingConfiguration.java` (dòng 13-30)
  - `backend/forum-service/src/main/java/com/agriculture/forum/service/ForumService.java` (dòng 26-30, 89-91)
  - `backend/forum-service/src/main/java/com/agriculture/forum/client/UserProfileClient.java` (dòng 8-13)

- **Cơ chế kỹ thuật**:
  1. `gatewayHeaderForwardingInterceptor` sao chép mù quáng `X-User-Id`, `X-Username`, `X-Roles` của người dùng đang gửi request hiện tại và gắn vào **mọi** cuộc gọi Feign.
  2. Khi Alice duyệt danh sách bài viết trên diễn đàn (`getAllPosts()`), Forum Service gọi `getProfileByUserId(authorId)` để lấy profile của tác giả Bob (ID 10) và Charlie (ID 25).
  3. Cuộc gọi nội bộ tới `user-service` mang header `X-User-Id: 42` (Alice). Nếu `user-service` thực hiện ghi log kiểm toán hoặc kiểm tra quyền sở hữu dựa trên `X-User-Id`, hành vi này sẽ gây sai lệch dữ liệu audit nghiêm trọng (Confused Deputy).
  4. Vấn đề N+1 HTTP request: Hàm `getAllPosts()` lặp tuần tự `stream().map(this::toPostResponse)` qua từng bài viết để gửi một request HTTP Feign riêng biệt. Nếu có 100 bài viết, Forum Service sẽ thực hiện **100 cuộc gọi HTTP liên dịch vụ** tuần tự mà không có cơ chế cache hoặc batch query.

- **Biện pháp khắc phục (Remediation)**:
  1. Đối với các cuộc gọi lấy dữ liệu công khai như thông tin tác giả, không chuyển tiếp header danh tính của người dùng gọi API. Sử dụng danh tính dịch vụ (Service Account / header nội bộ `X-Service-Name: forum-service`).
  2. Bổ sung cơ chế cache thông tin tác giả (`@Cacheable` với Redis hoặc Caffeine) tại `ForumService`.
  3. Xây dựng API lấy hàng loạt: `POST /api/users/profile/batch` nhận danh sách `userIds` thay vì gọi đơn lẻ từng người dùng.
  4. Bổ sung Circuit Breaker (Resilience4j) cho Feign Client để tránh lỗi xếp tầng (Cascading Failure).

---

### SEC-07 [HIGH - Kiến trúc]: Rủi ro tồn dư của Trust Model A: Eureka lộ lọt không bảo vệ, mạng Docker phẳng

- **Tệp tin liên quan**:
  - `backend/discovery-service/src/main/resources/application.yml`
  - `docker-compose.yml` (dòng 84-87, 209-211)

- **Cơ chế kỹ thuật**:
  - Theo mô hình Trust Model A (Zero Trust nội bộ bị bỏ qua), các microservice tin cậy hoàn toàn các header gửi tới cổng của chúng mà không kiểm tra chữ ký số.
  - Cổng **8761** của Netflix Eureka (`discovery-service`) đang mở public ra ngoài host không có bảo mật (không kích hoạt Spring Security / HTTP Basic Auth).
  - Toàn bộ dịch vụ dùng chung bridge network `agriculture-net`. Bất kỳ container nào bị thỏa hiệp (ví dụ `ai-service` mở cổng 8000) đều có thể gửi HTTP request trực tiếp tới `user-service:8082` với header `X-User-Id: 1` và `X-Roles: ROLE_ADMIN`, hoàn toàn qua mặt API Gateway.

- **Biện pháp khắc phục (Remediation)**:
  1. Không publish cổng `8761` của Eureka ra internet/host công khai; bật xác thực HTTP Basic Auth cho Eureka.
  2. Phân vùng mạng Docker: chỉ cho phép API Gateway kết nối tới các microservice backend.
  3. Áp dụng Defense-in-Depth: Bổ sung shared secret header giữa Gateway và microservice (ví dụ `X-Gateway-Signature` hoặc mTLS).

---

### SEC-08 [LOW]: Thiếu chuẩn hóa phản hồi lỗi token RFC 6750 (`WWW-Authenticate`) và ghi log bảo mật

- **Tệp tin liên quan**:
  - `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java` (dòng 56-64, 130-133)

- **Cơ chế kỹ thuật**:
  Bộ lọc bắt toàn bộ `JwtException` và `IllegalArgumentException` nhưng trả về HTTP 401 với thân rỗng (`setComplete()`), không đính kèm header chuẩn `WWW-Authenticate: Bearer error="invalid_token"` theo RFC 6750 Section 3, và không ghi log cảnh báo.

- **Biện pháp khắc phục (Remediation)**:
  Bổ sung header `WWW-Authenticate` và trả về JSON payload có cấu trúc (`{"status": 401, "error": "Unauthorized", "message": "..."}`) để client (Next.js) phân biệt token hết hạn (cần gọi refresh) và token giả mạo (cần logout).

---

## 4. Điểm sáng trong thiết kế hiện tại (Positive Observations)

- **Bảo vệ dữ liệu riêng tư (PII)**: T3 đã tạo riêng `UserProfileViewDTO` và `AuthorProfileDTO` chỉ chứa `userId`, `fullName`, `avatarUrl`, `bio`, loại trừ trường nhạy cảm `phone` có trong entity `UserProfile`.
- **Cải thiện tính nhất quán trong Forum Controller**: T3 đã loại bỏ `defaultValue = "1"` trên `ForumController` và chuyển thành `@RequestHeader("X-User-Id") Long userId`.
- **Kiểm tra tiền tố Bearer không phân biệt hoa thường**: `authorization.regionMatches(true, 0, "Bearer ", 0, 7)` xử lý tốt chuẩn viết hoa/thường của HTTP header.

---

## 5. Kết luận và Kế hoạch khắc phục (Action Plan)

Đội ngũ phát triển cần giải quyết các vấn đề theo thứ tự ưu tiên trước khi hợp nhất (merge):

1. **Khẩn cấp (Blockers)**:
   - Sửa `isUserHeader()` để xóa triệt để `X-Username` và `X-Roles`.
   - Bỏ chặn CORS Preflight `OPTIONS` trong `JwtAuthenticationGlobalFilter`.
   - Bắt buộc kiểm tra `userId != null` tại Gateway; gỡ bỏ `defaultValue = "1"` ở tất cả controller còn lại.
   - Đồng bộ biến môi trường `APP_JWT_SECRET` trong `docker-compose.yml` và loại bỏ secret mặc định.
2. **Trung hạn**:
   - Tối ưu hóa Feign Client (bỏ chuyển tiếp `X-User-Id` của caller, bổ sung cache và batch API).
   - Khóa cổng Eureka 8761 và phân tách network.
