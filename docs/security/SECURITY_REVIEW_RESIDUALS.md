# Báo cáo tái thẩm định các phát hiện bảo mật tồn dư (Security Review: Residual Findings)

**Dự án**: Smart Agriculture Management System  
**Ngày thực hiện**: 2026-10-08  
**Trạng thái kiểm toán**: Post-Fix Wave Residuals Deep-Dive  
**Phạm vi thẩm định**: Đánh giá chuyên sâu 4 phát hiện tồn dư (**SEC-05**, **SEC-06**, **SEC-07**, **SEC-08**) dựa trên mã nguồn thực tế tại 5 worktrees (`t1-auth-jwt-claims`, `t2-gateway-jwt`, `t3-feign-forum-user`, `t4-security-review`, `t5-security-config`) so với commit gốc `662486b`.  
**Mô hình tin cậy (Threat & Trust Model)**: **Trust Model A (Edge Authentication + Internal Header Propagation)**. Trong mô hình này:
- API Gateway đóng vai trò phòng tuyến biên giới (Edge Sentinel), chịu trách nhiệm duy nhất về xác thực chữ ký số JWT, bóc tách claims, loại bỏ các header danh tính không tin cậy từ client, và tiêm các header định danh đã được làm sạch (`X-User-Id`, `X-Username`, `X-Roles`) vào request trước khi chuyển tiếp tới mạng nội bộ.
- Các microservice nội bộ tin cậy các header danh tính được Gateway gửi tới và không tự thực hiện lại quy trình xác thực JWT phức tạp.

---

## 1. Bảng tổng hợp trạng thái các phát hiện tồn dư (Residual Findings Matrix)

| Mã ID | Tiêu đề phát hiện | Mức độ ban đầu | Mức độ thẩm định lại | Tệp tin & Dòng mã bằng chứng (Current Tree) | Khả năng khai thác thực tế (Trust Model A) | Có chặn Merge không? (Blocks Merge?) |
|---|---|---|---|---|---|---|
| **SEC-05** | Whitelist đường dẫn công khai quá rộng & Gãy logic tại `POST /api/auth/logout` | **MEDIUM** | **MEDIUM** (Giữ nguyên) | `api-gateway`: `JwtAuthenticationGlobalFilter.java:105-111`<br>`auth-service`: `AuthController.java:136-142`<br>`auth-service`: `WebSecurityConfig.java:56` | **Thấp / Lỗi ứng dụng (500)**: Gọi logout không token gây `ClassCastException` 500 thay vì 401; rủi ro mở rộng whitelist ngoài ý muốn. | **KHÔNG CHẶN (NON-BLOCKING)** |
| **SEC-06** | Feign chuyển tiếp danh tính caller sai ngữ cảnh (Confused Deputy) & Vấn đề N+1 REST Calls | **MEDIUM** | **MEDIUM** (Giữ nguyên) | `forum-service`: `FeignHeaderForwardingConfiguration.java:13-30`<br>`forum-service`: `ForumService.java:27-31, 51-55, 91-93`<br>`forum-service`: `UserProfileClient.java:8-13` | **Thấp (Audit noise) + Suy giảm hiệu năng**: PII đã được ẩn qua `UserProfileViewDTO`, không chiếm được quyền; nhưng tạo tải N+1 HTTP calls khi duyệt bài viết. | **KHÔNG CHẶN (NON-BLOCKING)** |
| **SEC-07** | Rủi ro kiến trúc Trust Model A: Eureka công khai không bảo vệ, mạng Docker phẳng | **HIGH** (Kiến trúc) | **HIGH** (Kiến trúc / Hạ tầng) | `root`: `docker-compose.yml:81-87, 209-211`<br>`discovery-service`: `application.yml:1-16` | **Trung bình - Cao (Nội bộ)**: Nếu mạng Docker bị xâm nhập hoặc Eureka lộ ra Internet, kẻ tấn công có thể giả mạo header gửi thẳng tới backend; cần bảo vệ ở tầng hạ tầng/mạng. | **KHÔNG CHẶN (NON-BLOCKING)** |
| **SEC-08** | Thiếu chuẩn hóa phản hồi lỗi token RFC 6750 (`WWW-Authenticate`) và Security Logging | **LOW** | **LOW** (Giữ nguyên) | `api-gateway`: `JwtAuthenticationGlobalFilter.java:58, 63, 74, 80, 144-147` | **Không có (Zero Exploitability)**: Không phải lỗ hổng xâm nhập, chỉ là sự thiếu hụt chuẩn RFC và thiếu khả năng giám sát tập trung (SIEM / Audit logging). | **KHÔNG CHẶN (NON-BLOCKING)** |

---

## 2. Thẩm định chi tiết từng phát hiện tồn dư

### 2.1. SEC-05: Lỗ hổng Whitelist đường dẫn công khai & Gãy logic tại `POST /api/auth/logout`

#### A. Mô tả chi tiết (Description)
Bộ lọc bảo mật toàn cục của API Gateway (`JwtAuthenticationGlobalFilter`) xác định các đường dẫn công khai (không cần kiểm tra JWT) thông qua hàm `isPublicPath(path)`. Hàm này hiện đang sử dụng phép so khớp tiền tố `path.startsWith("/api/auth/")`. 

Tuy nhiên, trong `auth-service`, endpoint `POST /api/auth/logout` được thiết kế dành cho người dùng đã đăng nhập để hủy refresh token của chính họ dựa trên danh tính người dùng trong `SecurityContextHolder`.

Do sự bất đối xứng giữa Gateway (coi toàn bộ `/api/auth/**` là công khai) và Auth Service (cho phép toàn bộ `/api/auth/**` đi qua bộ lọc Spring Security mà không bắt buộc xác thực trước khi tới controller):
1. Khi một request không có token được gửi tới `POST /api/auth/logout`, Gateway cho qua mà không chặn lại.
2. Tại `auth-service`, `WebSecurityConfig` cho phép qua do `requestMatchers("/api/auth/**").permitAll()`.
3. Bộ lọc `AuthTokenFilter` không tìm thấy Bearer token nên không thiết lập `Authentication` trong `SecurityContextHolder`.
4. Spring Security mặc định gán đối tượng nặc danh (`AnonymousAuthenticationToken` với principal là chuỗi `"anonymousUser"`).
5. Khi `AuthController.logoutUser()` cố gắng ép kiểu `(UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()`, Java ném ngoại lệ `ClassCastException`, trả về HTTP 500 Internal Server Error thay vì HTTP 401 Unauthorized.
6. Ngoài ra, việc dùng wildcard `startsWith("/api/auth/")` tại Gateway tạo ra tiền lệ rủi ro: bất kỳ endpoint quản trị hoặc nhạy cảm nào được thêm vào dưới prefix `/api/auth/` trong tương lai sẽ vô tình bị bỏ qua lớp xác thực Gateway.

#### B. Bằng chứng mã nguồn thực tế (Current Tree Evidence)
1. **Tại Worktree `t2-gateway-jwt`**:
   - Tệp tin: `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java`
   - Dòng 52–54:
     ```java
     if (isPublicPath(requestWithoutClientIdentity.getPath().pathWithinApplication().value())) {
         return chain.filter(sanitizedExchange);
     }
     ```
   - Dòng 105–111:
     ```java
     private static boolean isPublicPath(String path) {
         return path.equals("/api/auth")
                 || path.startsWith("/api/auth/")
                 || path.equals("/error")
                 || path.equals("/actuator/health")
                 || path.startsWith("/actuator/health/");
     }
     ```

2. **Tại Worktree `t1-auth-jwt-claims`**:
   - Tệp tin: `backend/auth-service/src/main/java/com/agriculture/auth/controller/AuthController.java`
   - Dòng 136–142:
     ```java
     @PostMapping("/logout")
     public ResponseEntity<?> logoutUser() {
         UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
         Long userId = userDetails.getId();
         refreshTokenService.deleteByUserId(userId);
         return ResponseEntity.ok(new MessageResponse("Log out successful!"));
     }
     ```
   - Tệp tin: `backend/auth-service/src/main/java/com/agriculture/auth/security/WebSecurityConfig.java`
   - Dòng 56:
     ```java
     .requestMatchers("/api/auth/**").permitAll()
     ```

#### C. Khả năng khai thác thực tế dưới Trust Model A (Realistic Exploitability)
- **Kịch bản người dùng hợp lệ (Happy Path)**: Khi người dùng gửi request logout kèm theo header `Authorization: Bearer <valid_token>`, Gateway vẫn làm sạch các header danh tính (`sanitizedExchange`), nhưng giữ nguyên header `Authorization`. Khi request tới `auth-service`, bộ lọc nội bộ `AuthTokenFilter` giải mã token hợp lệ và nạp `UserDetailsImpl` vào `SecurityContextHolder`. Đoạn code logout thực thi thành công và xóa refresh token.
- **Kịch bản tấn công / Lỗi (Negative Path)**: Nếu client gửi request `POST /api/auth/logout` mà không có token hoặc token không hợp lệ, Gateway không chặn 401 mà đẩy về `auth-service`, kích hoạt `ClassCastException` và trả về mã lỗi 500. Kẻ tấn công không thể chiếm quyền tài khoản hay can thiệp dữ liệu của người khác, vì không có session/refresh token nào bị rò rỉ.
- **Rủi ro kiến trúc**: Rủi ro lớn nhất là mở rộng attack surface nếu có endpoint nội bộ mới được đặt nhầm dưới `/api/auth/`.

#### D. Mức độ nghiêm trọng (Severity)
- **Mức độ ban đầu**: **MEDIUM**
- **Mức độ thẩm định lại**: **MEDIUM** (Giữ nguyên).
- **Lý do**: Không gây rò rỉ thông tin hay leo thang đặc quyền, nhưng phá vỡ chuẩn phản hồi RESTful (500 thay vì 401) và thiếu chặt chẽ trong định nghĩa whitelist đường dẫn.

#### E. Phương án khắc phục cụ thể & Phân công (Remediation Options & Suggested Scope/Owner)
- **Phương án 1 (Khuyến nghị - Khắc phục tại Gateway & Auth)**:
  - *Tại API Gateway*: Chuyển `isPublicPath` sang so khớp danh sách tường minh:
    ```java
    private static final Set<String> PUBLIC_EXACT_PATHS = Set.of(
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/refresh",
            "/error",
            "/actuator/health"
    );
    ```
    Loại bỏ `/api/auth/logout` khỏi danh sách công khai, buộc Gateway phải xác thực token và đính kèm `X-User-Id`.
  - *Tại Auth Service*: Cập nhật `logoutUser` để nhận `@RequestHeader("X-User-Id") Long userId` đồng bộ với Trust Model A, hoặc kiểm tra an toàn `principal instanceof UserDetailsImpl`.
- **Phân công & Kế hoạch (Owner/Scope)**:
  - Owner: Backend Auth / Gateway Team.
  - Scope: Sprint tiếp theo (Sprint +1), ưu tiên Medium.

#### F. Kết luận chặn Merge (Blocking Verdict)
- **KHÔNG CHẶN MERGE (DOES NOT BLOCK MERGE)**. Các luồng đăng nhập, đăng ký, refresh token và nghiệp vụ chính đều vận hành an toàn. Luồng logout có token hợp lệ vẫn chạy thành công.

---

### 2.2. SEC-06: Feign chuyển tiếp danh tính người gọi sai ngữ cảnh (Confused Deputy) & Vấn đề N+1 DoS

#### A. Mô tả chi tiết (Description)
1. **Confused Deputy Context Leaking**:
   Trong `forum-service` (worktree `t3-feign-forum-user`), cấu hình `FeignHeaderForwardingConfiguration` đăng ký một `RequestInterceptor` toàn cục. Bộ chặn này tự động lấy các header `X-User-Id`, `X-Username`, `X-Roles` từ HTTP request hiện tại của người dùng gọi API và đính kèm vào mọi cuộc gọi HTTP Feign Client đi ra ngoài.
   Khi người dùng $A$ (ví dụ: `X-User-Id: 42`) gọi `GET /api/forum/posts` để xem danh sách diễn đàn, `forum-service` cần lấy thông tin hiển thị của tác giả $B$ (`authorId: 10`) và tác giả $C$ (`authorId: 20`). Các cuộc gọi Feign tới `user-service` (`GET /api/users/profile/10`) lại vô tình mang theo header danh tính của $A$ (`X-User-Id: 42`).
2. **Vấn đề N+1 HTTP REST Overhead**:
   Trong `ForumService.java`, phương thức `getAllPosts()` và `getComments()` sử dụng Stream lặp qua từng bài viết/bình luận và gọi `userProfileClient.getProfileByUserId(userId)` một cách tuần tự (synchronous sequential HTTP calls). Nếu có 50 bài viết hoặc bình luận, hệ thống sẽ phát sinh 50 cuộc gọi REST liên dịch vụ độc lập mà không có bộ nhớ đệm (caching) hay cơ chế lấy hàng loạt (batching).

#### B. Bằng chứng mã nguồn thực tế (Current Tree Evidence)
1. **Tại Worktree `t3-feign-forum-user`**:
   - Tệp tin: `backend/forum-service/src/main/java/com/agriculture/forum/config/FeignHeaderForwardingConfiguration.java`
   - Dòng 13–29:
     ```java
     private static final String[] GATEWAY_HEADERS = {"X-User-Id", "X-Username", "X-Roles"};

     @Bean
     public RequestInterceptor gatewayHeaderForwardingInterceptor() {
         return template -> {
             if (!(RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes attributes)) {
                 return;
             }

             HttpServletRequest request = attributes.getRequest();
             for (String header : GATEWAY_HEADERS) {
                 String value = request.getHeader(header);
                 if (value != null) {
                     template.header(header, value);
                 }
             }
         };
     }
     ```
   - Tệp tin: `backend/forum-service/src/main/java/com/agriculture/forum/service/ForumService.java`
   - Dòng 27–31, 71, 91–93:
     ```java
     public List<PostResponseDTO> getAllPosts() {
         return postRepository.findAllByOrderByCreatedAtDesc().stream()
                 .map(this::toPostResponse)
                 .toList();
     }
     ...
     private PostResponseDTO toPostResponse(Post post) {
         return PostResponseDTO.builder()
                 ...
                 .author(getAuthorProfile(post.getAuthorId()))
                 ...
                 .build();
     }
     ...
     private AuthorProfileDTO getAuthorProfile(Long userId) {
         return userId == null ? null : userProfileClient.getProfileByUserId(userId);
     }
     ```
   - Tệp tin: `backend/forum-service/src/main/java/com/agriculture/forum/client/UserProfileClient.java`
   - Dòng 8–13:
     ```java
     @FeignClient(name = "user-service", path = "/api/users/profile", dismiss404 = true)
     public interface UserProfileClient {
         @GetMapping("/{userId}")
         AuthorProfileDTO getProfileByUserId(@PathVariable("userId") Long userId);
     }
     ```
   - Tệp tin: `backend/user-service/src/main/java/com/agriculture/user/controller/UserProfileController.java`
   - Dòng 30–37:
     ```java
     @GetMapping("/{userId}")
     public ResponseEntity<UserProfileViewDTO> getProfileByUserId(@PathVariable Long userId) {
         UserProfile profile = userProfileService.getProfile(userId);
         if (profile != null) {
             return ResponseEntity.ok(UserProfileViewDTO.from(profile));
         }
         return ResponseEntity.notFound().build();
     }
     ```

#### C. Khả năng khai thác thực tế dưới Trust Model A (Realistic Exploitability)
- **Về mặt bảo mật (Confused Deputy & Dữ liệu riêng tư)**:
  - Trong `UserProfileController.java`, endpoint công khai `GET /api/users/profile/{userId}` chỉ đọc biến đường dẫn `@PathVariable Long userId`, hoàn toàn **không** đọc hay sử dụng `@RequestHeader("X-User-Id")`.
  - Hơn nữa, đối tượng trả về là `UserProfileViewDTO` chỉ chứa các trường hiển thị công khai (`userId`, `fullName`, `avatarUrl`, `bio`), trường nhạy cảm `phoneNumber` trong entity gốc `UserProfile` đã được che chắn cẩn thận.
  - Do đó, kẻ tấn công **hoàn toàn không thể** lợi dụng việc chuyển tiếp header này để đọc trộm dữ liệu nhạy cảm hay leo thang đặc quyền trên `user-service`.
  - Hệ quả bảo mật hiện tại chỉ giới hạn ở việc làm nhiễu audit log nội bộ (nếu `user-service` ghi log ai truy cập hồ sơ).
- **Về mặt hiệu năng (N+1 DoS)**:
  - Khi số lượng bài đăng tăng lên, việc gửi N HTTP request đồng bộ sẽ làm cạn kiệt connection pool của Tomcat / Feign và tăng độ trễ mạng (latency). Kẻ tấn công có thể liên tục gửi request đọc forum để gây tải cao cho cả hai dịch vụ.

#### D. Mức độ nghiêm trọng (Severity)
- **Mức độ ban đầu**: **MEDIUM**
- **Mức độ thẩm định lại**: **MEDIUM** (Giữ nguyên).
- **Lý do**: Không rò rỉ dữ liệu cá nhân (PII đã được bảo vệ tốt bởi DTO), không thể khai thác leo thang quyền hạn, nhưng cần tái cấu trúc để loại bỏ rủi ro hiệu năng N+1 và chuẩn hóa ngữ cảnh truyền tin nội bộ.

#### E. Phương án khắc phục cụ thể & Phân công (Remediation Options & Suggested Scope/Owner)
- **Phương án 1 (Loại bỏ Header Forwarding sai ngữ cảnh)**:
  Tách riêng cấu hình Feign: chỉ forward `X-User-Id` cho các endpoint mang tính chất đại diện người dùng thực (on-behalf-of actions). Với các endpoint lấy dữ liệu công khai (public author info), sử dụng Feign Client không kèm `RequestInterceptor` này, hoặc định danh dịch vụ bằng header riêng `X-Service-Client: forum-service`.
- **Phương án 2 (Giải quyết N+1 bằng Batch Endpoint & In-Memory Cache)**:
  - Bổ sung endpoint hàng loạt tại `user-service`: `POST /api/users/profile/batch` nhận danh sách `List<Long> userIds` và trả về danh sách hồ sơ trong một truy vấn SQL duy nhất (`WHERE user_id IN (...)`).
  - Tích hợp bộ nhớ đệm tại `forum-service`: Sử dụng `@Cacheable(value = "authors", key = "#userId")` với Caffeine Cache (TTL 5-10 phút) để tránh gọi lại Feign đối với các tác giả quen thuộc.
- **Phân công & Kế hoạch (Owner/Scope)**:
  - Owner: Forum Service & User Service Dev Team.
  - Scope: Sprint +1 (Tối ưu hóa hiệu năng & Microservice communication).

#### F. Kết luận chặn Merge (Blocking Verdict)
- **KHÔNG CHẶN MERGE (DOES NOT BLOCK MERGE)**. Tính năng tương tác liên dịch vụ hoạt động chính xác về mặt nghiệp vụ; dữ liệu cá nhân đã được bảo vệ nghiêm ngặt bằng DTO.

---

### 2.3. SEC-07: Rủi ro tồn dư của Trust Model A: Eureka lộ lọt không bảo vệ, mạng Docker phẳng

#### A. Mô tả chi tiết (Description)
Trust Model A giả định rằng mạng nội bộ là một vùng tin cậy (Trusted Zone). Tuy nhiên, kiến trúc triển khai hiện tại trong `docker-compose.yml` tiềm ẩn 2 điểm yếu hạ tầng cốt lõi:
1. **Lộ cổng Eureka Discovery Service**: Cổng `8761:8761` đang được export trực tiếp ra host. Service Discovery của Netflix Eureka hiện không cấu hình Spring Security hoặc xác thực HTTP Basic Auth.
2. **Mạng Docker phẳng (Flat Docker Network)**: Toàn bộ container (từ Gateway công khai, frontend, cơ sở dữ liệu PostgreSQL/MongoDB, Kafka cho tới các backend microservices) đều cắm chung vào duy nhất 1 Docker bridge network mang tên `agriculture-net`.

#### B. Bằng chứng mã nguồn thực tế (Current Tree Evidence)
1. **Tại Worktree `t5-security-config`**:
   - Tệp tin: `docker-compose.yml`
   - Dòng 81–87:
     ```yaml
     discovery-service:
       build:
         context: ./backend/discovery-service
       ports:
         - "8761:8761"
       networks:
         - agriculture-net
     ```
   - Dòng 209–211:
     ```yaml
     networks:
       agriculture-net:
         driver: bridge
     ```
2. **Tại Worktree `t4-security-review` (và gốc commit `662486b`)**:
   - Tệp tin: `backend/discovery-service/src/main/resources/application.yml`
   - Dòng 1–16:
     ```yaml
     server:
       port: 8761

     spring:
       application:
         name: discovery-service

     eureka:
       instance:
         hostname: localhost
       client:
         register-with-eureka: false
         fetch-registry: false
         service-url:
           defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
     ```
     *(Hoàn toàn không có cấu hình xác thực hoặc bảo mật)*.

#### C. Khả năng khai thác thực tế dưới Trust Model A (Realistic Exploitability)
- **Khai thác qua Eureka lộ lọt**:
  - Kẻ tấn công trên mạng nội bộ hoặc qua cổng 8761 mở ra Internet có thể truy cập Eureka Dashboard để xem cấu trúc toàn bộ hệ thống, địa chỉ IP và cổng của từng microservice.
  - Nguy hiểm hơn, kẻ tấn công có thể đăng ký một instance giả mạo (Rogue Service Registration) vào Eureka, khiến Gateway hoặc Feign Client điều hướng lưu lượng người dùng về máy chủ độc hại (Man-in-the-Middle).
- **Khai thác qua mạng phẳng (Bypass Gateway)**:
  - Do Trust Model A không yêu cầu backend microservice ký/xác thực lại token, các service (`user-service:8082`, `crop-service:8083`, `notification-service:8086`) tin tưởng tuyệt đối vào header `X-User-Id: 1` và `X-Roles: ROLE_ADMIN`.
  - Nếu bất kỳ container nào trên `agriculture-net` bị xâm nhập (ví dụ qua lỗ hổng SSRF trên `ai-service` hoặc mã độc trong container `frontend`), kẻ tấn công có thể trực tiếp gửi HTTP request nội bộ tới thẳng cổng backend của `crop-service` hay `user-service`, chiếm đoạt hoàn toàn quyền Admin mà Gateway không hề hay biết.

#### D. Mức độ nghiêm trọng (Severity)
- **Mức độ ban đầu**: **HIGH (Kiến trúc)**
- **Mức độ thẩm định lại**: **HIGH (Kiến trúc / Hạ tầng)** (Giữ nguyên).
- **Lý do**: Đây là điểm yếu cố hữu của mô hình Trust Model A khi không có Zero Trust hoặc phân đoạn mạng (Network Segmentation). Tuy nhiên, đây là bài toán cấu hình môi trường triển khai (DevOps/Infrastructure), không phải lỗi logic mã nguồn của đợt fix wave ứng dụng.

#### E. Phương án khắc phục cụ thể & Phân công (Remediation Options & Suggested Scope/Owner)
- **Phương án 1 (Phân đoạn mạng Docker Network Segmentation - Khuyến nghị ngắn hạn)**:
  Chia `agriculture-net` thành 2 mạng riêng biệt trong `docker-compose.yml`:
  1. `public-net`: Chỉ gồm `frontend` và `api-gateway`.
  2. `internal-net`: Gồm `api-gateway`, `discovery-service`, và toàn bộ backend microservices + database.
  - Gỡ bỏ dòng `ports: - "8761:8761"` của Eureka trong môi trường sản xuất (hoặc chỉ bind `127.0.0.1:8761:8761`).
- **Phương án 2 (Kích hoạt xác thực HTTP Basic Auth cho Eureka)**:
  Thêm `spring-boot-starter-security` vào `discovery-service`, cấu hình username/password cho Eureka Dashboard và cập nhật `eureka.client.serviceUrl.defaultZone` trên tất cả microservice.
- **Phương án 3 (Phòng vệ chuyên sâu - Defense-in-Depth HMAC)**:
  Thiết lập khóa bí mật chia sẻ nội bộ: API Gateway ký một HMAC header đặc biệt (ví dụ `X-Gateway-Token: <hmac>`), các microservice backend kiểm tra header này trước khi chấp nhận `X-User-Id`.
- **Phân công & Kế hoạch (Owner/Scope)**:
  - Owner: DevOps / Security Platform Engineering Team.
  - Scope: Đợt chuẩn bị hạ tầng triển khai Production (Production Hardening Milestone).

#### F. Kết luận chặn Merge (Blocking Verdict)
- **KHÔNG CHẶN MERGE (DOES NOT BLOCK MERGE)**. Việc fix wave giải quyết các lỗ hổng mã nguồn ứng dụng (SEC-01..04) là điều kiện cần. Bài toán phân vùng mạng và cấu hình bảo mật Eureka thuộc phạm vi quản lý hạ tầng và sẽ được triển khai trong runbook triển khai production.

---

### 2.4. SEC-08: Thiếu chuẩn hóa phản hồi lỗi token RFC 6750 (`WWW-Authenticate`) và Security Logging

#### A. Mô tả chi tiết (Description)
Khi `JwtAuthenticationGlobalFilter` phát hiện token không hợp lệ, hết hạn, giả mạo hoặc thiếu claim bắt buộc `userId`, hàm `unauthorized(exchange)` được gọi:
```java
private static Mono<Void> unauthorized(ServerWebExchange exchange) {
    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
    return exchange.getResponse().setComplete();
}
```
Thiết kế này còn 2 hạn chế:
1. **Thiếu chuẩn RFC 6750 Section 3**: Chuẩn OAuth 2.0 Bearer Token quy định rõ rằng khi request bị từ chối xác thực, server phải gửi header `WWW-Authenticate: Bearer error="invalid_token", error_description="..."`.
2. **Thiếu Structured Security Logging & Error Payload**:
   - Thân phản hồi (Response Body) bị để trống hoàn toàn (`setComplete()`), khiến ứng dụng client (Frontend Next.js) gặp khó khăn trong việc phân loại phản hồi lỗi: ví dụ không thể phân biệt giữa token hết hạn (cần kích hoạt refresh token ngầm) với token bị can thiệp trái phép (cần logout ngay lập tức).
   - Không có bất kỳ dòng log nào (`log.warn(...)`) được ghi lại tại Gateway khi từ chối token, gây mù mờ cho việc theo dõi, cảnh báo sớm và điều tra an ninh (SIEM/Audit).

#### B. Bằng chứng mã nguồn thực tế (Current Tree Evidence)
1. **Tại Worktree `t2-gateway-jwt`**:
   - Tệp tin: `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java`
   - Dòng 58, 63, 74, 80: Các điểm gọi `unauthorized(exchange)`.
   - Dòng 144–147:
     ```java
     private static Mono<Void> unauthorized(ServerWebExchange exchange) {
         exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
         return exchange.getResponse().setComplete();
     }
     ```

#### C. Khả năng khai thác thực tế dưới Trust Model A (Realistic Exploitability)
- **Khả năng khai thác**: **Hoàn toàn không có (0% Exploitability)**.
- **Tác động**: Không tạo ra lỗ hổng để kẻ tấn công đột nhập; hệ thống vẫn từ chối truy cập an toàn với mã HTTP 401. Đây thuần túy là vấn đề tuân thủ tiêu chuẩn giao thức (RFC compliance), trải nghiệm tích hợp lập trình (Developer Experience - DX), và khả năng giám sát vận hành (Observability).

#### D. Mức độ nghiêm trọng (Severity)
- **Mức độ ban đầu**: **LOW**
- **Mức độ thẩm định lại**: **LOW** (Giữ nguyên).
- **Lý do**: Không ảnh hưởng tới tính toàn vẹn và bảo mật của dữ liệu.

#### E. Phương án khắc phục cụ thể & Phân công (Remediation Options & Suggested Scope/Owner)
- **Phương án khắc phục**:
  Cải tiến hàm `unauthorized` để bổ sung header và ghi log:
  ```java
  private static Mono<Void> unauthorized(ServerWebExchange exchange, String error, String description) {
      ServerHttpResponse response = exchange.getResponse();
      response.setStatusCode(HttpStatus.UNAUTHORIZED);
      response.getHeaders().set(HttpHeaders.WWW_AUTHENTICATE,
              String.format("Bearer error=\"%s\", error_description=\"%s\"", error, description));
      log.warn("Gateway rejected unauthenticated access to {} from {}: {} - {}",
              exchange.getRequest().getPath(),
              exchange.getRequest().getRemoteAddress(),
              error, description);
      return response.setComplete();
  }
  ```
- **Phân công & Kế hoạch (Owner/Scope)**:
  - Owner: API Gateway Team.
  - Scope: Backlog / Code Polish Wave.

#### F. Kết luận chặn Merge (Blocking Verdict)
- **KHÔNG CHẶN MERGE (DOES NOT BLOCK MERGE)**.

---

## 3. Tổng kết quyết định thẩm định hợp nhất (Final Merge Assessment)

Tất cả 4 phát hiện tồn dư (**SEC-05, SEC-06, SEC-07, SEC-08**) đều đã được thẩm định chi tiết và xác nhận **KHÔNG CÓ PHÁT HIỆN NÀO CHẶN VIỆC MERGE ĐỢT FIX WAVE HIỆN TẠI (ZERO BLOCKERS)**.

Đợt Fix Wave này đã xử lý trọn vẹn và an toàn các lỗ hổng nguy cấp nhất:
- ✅ **SEC-01 [CRITICAL]**: Triệt tiêu hoàn toàn vector tấn công chiếm quyền Admin (loại bỏ `defaultValue = "1"` và bắt buộc claim `userId`).
- ✅ **SEC-02 [HIGH]**: Loại bỏ triệt để việc giả mạo header vai trò (`X-Roles`, `X-Username`, `X-User-Id`).
- ✅ **SEC-03 [HIGH]**: Khôi phục hoạt động bình thường cho CORS Preflight HTTP `OPTIONS`.
- ✅ **SEC-04 [HIGH]**: Đồng bộ hóa biến môi trường `${APP_JWT_SECRET}` giữa Docker và các service.

**Khuyến nghị**: Đủ điều kiện phê duyệt hợp nhất (PASS FOR MERGE) toàn bộ 4 nhánh fix wave vào nhánh tích hợp `main`.
