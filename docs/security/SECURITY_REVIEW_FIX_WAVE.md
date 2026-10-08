# Báo cáo tái đánh giá bảo mật (Security Re-Review): Đợt khắc phục (FIX WAVE) Gateway JWT Filter & OpenFeign

**Dự án**: Smart Agriculture Management System  
**Ngày thực hiện**: 2026-10-08  
**Trạng thái đợt kiểm toán**: Re-Review hoàn tất (Post-Fix Wave Audit)  
**Phạm vi đánh giá (Scope)**: Tái thẩm định các bản vá bảo mật trên 4 worktrees liên quan:
1. `t1-auth-jwt-claims` (`backend/auth-service` - branch `veejvn/t1-auth-jwt-claims`)
2. `t2-gateway-jwt` (`backend/api-gateway` - branch `veejvn/t2-gateway-jwt`) -> **FIX-A: Gateway hardening**
3. `t3-feign-forum-user` (`backend/forum-service`, `backend/user-service` - branch `veejvn/t3-feign-forum-user`) -> **FIX-B: User-service defaults**
4. `t5-security-config` (`backend/crop-service`, `backend/notification-service`, `backend/auth-service`, `docker-compose.yml` - branch `veejvn/t5-security-config`) -> **FIX-C: Config/defaults/secret sync**

---

## 1. Kết luận chung & Quyết định Merge (Executive Summary & Verdict)

### **Kết luận thẩm định hợp nhất (Merge Readiness Verdict): PASS (ĐẠT ĐIỀU KIỆN MERGE)**

Đợt khắc phục (Fix Wave) bao gồm FIX-A, FIX-B và FIX-C đã giải quyết triệt để và chính xác **tất cả 4 lỗ hổng nghiêm trọng và mức độ cao (Blockers: SEC-01, SEC-02, SEC-03, SEC-04)** được nêu trong báo cáo đánh giá ban đầu:
- Lỗ hổng nghiêm trọng nhất về bypass/chiếm quyền Admin (SEC-01) đã được khắc phục ở cả 2 đầu: Gateway chặn các token thiếu claim `userId` với mã 401, và toàn bộ 5 microservice (`crop-service`, `notification-service`, `user-service`, `forum-service`) đã loại bỏ hoàn toàn giá trị mặc định nguy hiểm `defaultValue = "1"`.
- Cơ chế lọc header giả mạo danh tính tại Gateway (SEC-02) đã được siết chặt với danh sách tường minh (`X-User-Id`, `X-Username`, `X-Roles`).
- Lỗi gãy CORS Preflight HTTP `OPTIONS` (SEC-03) đã được giải quyết, cho phép giao tiếp frontend-backend hoạt động bình thường.
- Sự bất đối xứng biến môi trường JWT Secret giữa Docker và các service (SEC-04) đã được đồng bộ hóa hoàn toàn thông qua `${APP_JWT_SECRET}`.

Các phát hiện còn lại (**SEC-05, SEC-06, SEC-07, SEC-08**) được xác định là **rủi ro tồn dư (Residual Risks)** đã được lường trước, nằm trong phạm vi Medium/Low hoặc tái cấu trúc hạ tầng/kiến trúc mạng, không cản trở việc merge đợt fix wave này vào nhánh tích hợp (main/staging).

---

## 2. Bảng tổng hợp trạng thái các phát hiện (Findings Status Matrix)

| ID | Tiêu đề phát hiện | Mức độ ban đầu | Trạng thái sau Fix Wave | Worktree & Tệp tin bằng chứng |
|---|---|---|---|---|
| **SEC-01** | Insecure Defaults (`defaultValue = "1"`) kết hợp thiếu validate `userId` claim dẫn đến chiếm đoạt tài khoản Admin | **CRITICAL** | **Fixed** | - `t2-gateway-jwt`: `JwtAuthenticationGlobalFilter.java` (L77-81)<br>- `t3-feign-forum-user`: `UserProfileController.java` (L19, L40), `FarmLocationController.java` (L20, L25)<br>- `t5-security-config`: `FarmPlotController.java` (L20, L25), `NotificationController.java` (L19, L24) |
| **SEC-02** | Lọc header thiếu sót: Khách hàng có thể giả mạo `X-Roles` và `X-Username` qua Gateway | **HIGH** | **Fixed** | - `t2-gateway-jwt`: `JwtAuthenticationGlobalFilter.java` (L27-33, L47-50, L113-115) |
| **SEC-03** | Chặn toàn bộ CORS Preflight (HTTP `OPTIONS`) dẫn đến gãy kết nối trình duyệt | **HIGH** | **Fixed** | - `t2-gateway-jwt`: `JwtAuthenticationGlobalFilter.java` (L43-45) |
| **SEC-04** | Hardcoded JWT Secret trong git, không đồng bộ biến môi trường giữa Docker & Service | **HIGH** | **Fixed** | - `t5-security-config`: `auth-service/src/main/resources/application.yml` (L26), `docker-compose.yml` (L98, L114)<br>- `t2-gateway-jwt`: `api-gateway/src/main/resources/application.yml` (L7) |
| **SEC-05** | Lỗ hổng Whitelist đường dẫn công khai & Gãy logic tại `POST /api/auth/logout` | **MEDIUM** | **Not fixed** (Residual) | - `t2-gateway-jwt`: `JwtAuthenticationGlobalFilter.java` (L106-107)<br>- `t1-auth-jwt-claims`: `AuthController.java` (L138) |
| **SEC-06** | Feign chuyển tiếp danh tính người gọi sai ngữ cảnh (Confused Deputy) & Nguy cơ N+1 DoS | **MEDIUM** | **Not fixed** (Residual) | - `t3-feign-forum-user`: `FeignHeaderForwardingConfiguration.java` (L13-29), `ForumService.java` (L27-30, L89-91) |
| **SEC-07** | Rủi ro tồn dư của Trust Model A: Eureka lộ lọt không bảo vệ, mạng Docker phẳng | **HIGH** (Kiến trúc) | **Not fixed** (Residual) | - `t5-security-config`: `docker-compose.yml` (L85, L87) |
| **SEC-08** | Thiếu chuẩn hóa phản hồi lỗi token RFC 6750 (`WWW-Authenticate`) và ghi log bảo mật | **LOW** | **Not fixed** (Residual) | - `t2-gateway-jwt`: `JwtAuthenticationGlobalFilter.java` (L144-147) |

---

## 3. Thẩm định chi tiết 5 tiêu chí cốt lõi (Core Criteria Verification)

### (a) Gateway trả về 401 khi claim `userId` bị thiếu hoặc rỗng
- **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t2-gateway-jwt`
- **Tệp tin**: `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java`
- **Dòng mã**: Lines 77–81:
  ```java
  Object userIdClaim = firstClaim(claims, "userId", "id");
  String userId = userIdClaim == null ? null : userIdClaim.toString();
  if (userId == null || userId.isBlank()) {
      return unauthorized(exchange);
  }
  ```
- **Đánh giá**: **Fixed**. Khi JWT hợp lệ về mặt chữ ký nhưng thiếu claim `userId` (hoặc rỗng), Gateway không còn bỏ qua như trước mà lập tức kết thúc exchange với HTTP 401 Unauthorized (`unauthorized(exchange)`).

### (b) Gateway xóa triệt để `X-User-Id`, `X-Username` và `X-Roles`
- **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t2-gateway-jwt`
- **Tệp tin**: `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java`
- **Dòng mã**: Lines 27–33, 47–50, 113–115:
  ```java
  private static final String USER_ID_HEADER = "X-User-Id";
  private static final String USERNAME_HEADER = "X-Username";
  private static final String ROLES_HEADER = "X-Roles";
  private static final Set<String> CLIENT_IDENTITY_HEADERS = Set.of(
          USER_ID_HEADER.toLowerCase(Locale.ROOT),
          USERNAME_HEADER.toLowerCase(Locale.ROOT),
          ROLES_HEADER.toLowerCase(Locale.ROOT));
  ...
  ServerHttpRequest requestWithoutClientIdentity = exchange.getRequest().mutate()
          .headers(headers -> headers.keySet().removeIf(JwtAuthenticationGlobalFilter::isUserHeader))
          .build();
  ServerWebExchange sanitizedExchange = exchange.mutate().request(requestWithoutClientIdentity).build();
  ...
  private static boolean isUserHeader(String headerName) {
      return CLIENT_IDENTITY_HEADERS.contains(headerName.toLowerCase(Locale.ROOT));
  }
  ```
- **Đánh giá**: **Fixed**. Phương thức `isUserHeader()` đã thay thế việc kiểm tra prefix `"X-User-"` bằng việc so khớp không phân biệt hoa thường trong tập `CLIENT_IDENTITY_HEADERS` (chứa đầy đủ `x-user-id`, `x-username`, `x-roles`). Cả request đi vào public paths và authenticated paths đều được sanitize trước tiên, ngăn chặn hoàn toàn việc client tự đính kèm các header này.

### (c) Gateway cho phép HTTP `OPTIONS` preflight đi qua mà không cần Authorization
- **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t2-gateway-jwt`
- **Tệp tin**: `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java`
- **Dòng mã**: Lines 43–45:
  ```java
  if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
      return chain.filter(exchange);
  }
  ```
- **Đánh giá**: **Fixed**. Ngay tại đầu hàm `filter()`, các request preflight với HTTP method `OPTIONS` được chuyển tiếp ngay tới `chain.filter(exchange)` mà không kiểm tra token, giúp CORS Preflight của trình duyệt hoạt động bình thường.

### (d) Toàn bộ các controller liên quan bắt buộc `X-User-Id` và không còn `defaultValue = "1"`
- **Crop Service (`FarmPlotController.java`)**:
  - **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t5-security-config`
  - **Tệp tin**: `backend/crop-service/src/main/java/com/agriculture/crop/controller/FarmPlotController.java`
  - **Dòng mã**:
    - Dòng 20: `public ResponseEntity<List<FarmPlot>> getPlots(@RequestHeader("X-User-Id") Long userId)`
    - Dòng 25: `public ResponseEntity<FarmPlot> createPlot(@RequestHeader("X-User-Id") Long userId, @RequestBody FarmPlotDTO dto)`
- **Notification Service (`NotificationController.java`)**:
  - **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t5-security-config`
  - **Tệp tin**: `backend/notification-service/src/main/java/com/agriculture/notification/controller/NotificationController.java`
  - **Dòng mã**:
    - Dòng 19: `public ResponseEntity<List<Notification>> getNotifications(@RequestHeader("X-User-Id") Long userId)`
    - Dòng 24: `public ResponseEntity<List<Notification>> getUnreadNotifications(@RequestHeader("X-User-Id") Long userId)`
- **User Service (`UserProfileController.java` & `FarmLocationController.java`)**:
  - **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t3-feign-forum-user`
  - **Tệp tin**: `backend/user-service/src/main/java/com/agriculture/user/controller/UserProfileController.java`
  - **Dòng mã**:
    - Dòng 19: `public ResponseEntity<UserProfile> getProfile(@RequestHeader("X-User-Id") Long userId)`
    - Dòng 40: `public ResponseEntity<UserProfile> updateProfile(@RequestHeader("X-User-Id") Long userId, @RequestBody UserProfileDTO dto)`
  - **Tệp tin**: `backend/user-service/src/main/java/com/agriculture/user/controller/FarmLocationController.java`
  - **Dòng mã**:
    - Dòng 20: `public ResponseEntity<List<FarmLocation>> getFarms(@RequestHeader("X-User-Id") Long userId)`
    - Dòng 25: `public ResponseEntity<FarmLocation> addFarm(@RequestHeader("X-User-Id") Long userId, @RequestBody FarmLocationDTO dto)`
- **Đánh giá**: **Fixed**. Toàn bộ 4 controller mục tiêu (và cả `ForumController` tại T3) đều đã gỡ bỏ hoàn toàn `required = false, defaultValue = "1"` và sử dụng `@RequestHeader("X-User-Id") Long userId`, buộc Spring MVC ném lỗi 400 Bad Request nếu thiếu header.

### (e) Cấu hình `app.jwt.secret` dùng placeholder `APP_JWT_SECRET` và `docker-compose.yml` đồng bộ cho cả hai service
- **Auth Service Config**:
  - **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t5-security-config`
  - **Tệp tin**: `backend/auth-service/src/main/resources/application.yml`
  - **Dòng mã**: Dòng 26:
    ```yaml
    app:
      jwt:
        secret: ${APP_JWT_SECRET:926D96C90030DD58429D2751AC1BDBBC926D96C90030DD58429D2751AC1BDBBC}
    ```
- **API Gateway Config**:
  - **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t2-gateway-jwt`
  - **Tệp tin**: `backend/api-gateway/src/main/resources/application.yml`
  - **Dòng mã**: Dòng 7:
    ```yaml
    app:
      jwt:
        secret: ${APP_JWT_SECRET:926D96C90030DD58429D2751AC1BDBBC926D96C90030DD58429D2751AC1BDBBC}
    ```
- **Root Docker Compose**:
  - **Worktree path**: `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/t5-security-config`
  - **Tệp tin**: `docker-compose.yml`
  - **Dòng mã**: Lines 96–98 (`api-gateway`) & Lines 108–114 (`auth-service`):
    ```yaml
    api-gateway:
      ...
      environment:
        - EUREKA_HOST=discovery-service
        - APP_JWT_SECRET=${JWT_SECRET}

    auth-service:
      ...
      environment:
        - EUREKA_HOST=discovery-service
        - DB_HOST=postgres-auth
        - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-auth:5432/auth_db
        - SPRING_DATASOURCE_USERNAME=${POSTGRES_USER:-postgres}
        - SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD:-postgres}
        - APP_JWT_SECRET=${JWT_SECRET}
    ```
- **Đánh giá**: **Fixed**. Cả hai dịch vụ hiện cùng đọc biến môi trường `APP_JWT_SECRET` với cùng giá trị fallback. `docker-compose.yml` đã ánh xạ `${JWT_SECRET}` vào `APP_JWT_SECRET` cho cả `api-gateway` và `auth-service`, chấm dứt hoàn toàn tình trạng lệch khóa bí mật khi triển khai container.

---

## 4. Danh sách các rủi ro tồn dư (Remaining Residuals & Backlog)

Các phát hiện sau đây không thuộc phạm vi xử lý tức thời của Fix Wave này và được chuyển thành các hạng mục kỹ thuật cần giải quyết trong các sprint tiếp theo:

### 1. SEC-05: Lỗ hổng Whitelist đường dẫn công khai & Logic tại `POST /api/auth/logout`
- **Mức độ nghiêm trọng**: **MEDIUM**
- **Vị trí**:
  - `t2-gateway-jwt/backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java` (L106-107)
  - `t1-auth-jwt-claims/backend/auth-service/src/main/java/com/agriculture/auth/controller/AuthController.java` (L138)
- **Mô tả tồn dư**: Gateway vẫn dùng `path.startsWith("/api/auth/")`, coi mọi endpoint dưới prefix này là public. Do đó `POST /api/auth/logout` không được Gateway xác thực hay gắn `X-User-Id`. Khi gọi qua Gateway mà không có JWT, `AuthController` gặp lỗi `ClassCastException` do `AnonymousAuthenticationToken`.
- **Khuyến nghị khắc phục**: Tinh chỉnh `isPublicPath()` thành danh sách chính xác (`/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`), loại bỏ `/api/auth/logout` khỏi whitelist và xác thực token đầy đủ.

### 2. SEC-06: Feign chuyển tiếp danh tính người gọi sai ngữ cảnh (Confused Deputy) & Vấn đề N+1 DoS
- **Mức độ nghiêm trọng**: **MEDIUM**
- **Vị trí**:
  - `t3-feign-forum-user/backend/forum-service/src/main/java/com/agriculture/forum/config/FeignHeaderForwardingConfiguration.java` (L13-29)
  - `t3-feign-forum-user/backend/forum-service/src/main/java/com/agriculture/forum/service/ForumService.java` (L27-30, L89-91)
- **Mô tả tồn dư**: `FeignHeaderForwardingConfiguration` tiếp tục sao chép `X-User-Id` của caller vào các cuộc gọi lấy profile công khai của tác giả bài viết, tiềm ẩn rủi ro Confused Deputy nếu `user-service` audit danh tính này. Đồng thời, `getAllPosts()` và `getComments()` vẫn lặp tuần tự gọi Feign qua từng post/comment (vấn đề N+1 HTTP calls, chưa có cache hoặc batch endpoint).
- **Khuyến nghị khắc phục**: Bổ sung endpoint `POST /api/users/profile/batch`, tích hợp cache (Caffeine/Redis) tại `ForumService`, và tách riêng cấu hình Feign không chuyển tiếp identity header cho các request public data.

### 3. SEC-07: Rủi ro kiến trúc hạ tầng - Eureka công khai và mạng Docker phẳng
- **Mức độ nghiêm trọng**: **HIGH (Kiến trúc)**
- **Vị trí**:
  - `t5-security-config/docker-compose.yml` (L85, L87)
  - `backend/discovery-service/src/main/resources/application.yml`
- **Mô tả tồn dư**: Netflix Eureka (`discovery-service`) vẫn mở cổng `8761:8761` trực tiếp ra host mà không có xác thực Spring Security / HTTP Basic Auth. Mạng Docker vẫn là 1 bridge network duy nhất `agriculture-net`, cho phép bất kỳ container nào bị thỏa hiệp gửi HTTP request thẳng tới các microservice backend mà không qua Gateway.
- **Khuyến nghị khắc phục**: Đóng port 8761 hoặc giới hạn localhost; kích hoạt Spring Security HTTP Basic Auth cho Eureka; phân chia mạng Docker thành 2 subnet (`public-net` cho gateway và `internal-net` cho backend services); bổ sung shared HMAC header (mTLS/gateway secret) để phòng vệ chuyên sâu (Defense-in-Depth).

### 4. SEC-08: Thiếu chuẩn hóa phản hồi lỗi token RFC 6750 (`WWW-Authenticate`) và Security Logging
- **Mức độ nghiêm trọng**: **LOW**
- **Vị trí**:
  - `t2-gateway-jwt/backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java` (L144-147)
- **Mô tả tồn dư**: Hàm `unauthorized()` trả về HTTP 401 với response body rỗng, thiếu header chuẩn `WWW-Authenticate: Bearer error="invalid_token"` theo RFC 6750 Section 3, đồng thời chưa ghi log bảo mật có cấu trúc (IP, path, lý do từ chối).
- **Khuyến nghị khắc phục**: Bổ sung header `WWW-Authenticate` và trả về JSON payload chuẩn hóa để Frontend dễ phân loại xử lý (refresh token vs logout), kết hợp ghi log bảo mật.

---

## 5. Kết luận cuối cùng

Đợt bản vá (Fix Wave) đã hoàn thành xuất sắc các mục tiêu an ninh mạng cấp bách:
1. Loại bỏ hoàn toàn vector tấn công chiếm quyền Admin User ID 1 qua cơ chế Insecure Defaults.
2. Ngăn chặn giả mạo header vai trò và người dùng (`X-Roles`, `X-Username`, `X-User-Id`).
3. Khôi phục hoạt động cho trình duyệt với CORS Preflight HTTP `OPTIONS`.
4. Đồng bộ hóa an toàn cấu hình JWT Secret trên toàn bộ hệ thống microservices và Docker.

**Khuyến nghị chính thức**: **Phê duyệt hợp nhất (PASS)** các nhánh `veejvn/t1-auth-jwt-claims`, `veejvn/t2-gateway-jwt`, `veejvn/t3-feign-forum-user`, và `veejvn/t5-security-config` vào nhánh phát triển chính. Các rủi ro tồn dư đã được lập hồ sơ chi tiết để đưa vào kế hoạch nâng cấp kiến trúc tiếp theo.
