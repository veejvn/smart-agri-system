# Báo cáo Thẩm định Bảo mật Đợt Xử lý Tồn dư (Security Review - Residuals Wave A)

**Dự án**: Smart Agriculture Management System  
**Ngày thực hiện**: 2026-10-09  
**Trạng thái kiểm toán**: Read-only Re-review Residual Wave A (R1 & R2)  
**Phạm vi thẩm định**:
- **R1 (`sec-gateway-whitelist`)**: Tái thẩm định SEC-05 (Allowlist đường dẫn công khai & token cho `/logout`), SEC-08 (Chuẩn hóa phản hồi 401 RFC 6750 & Security Logging), và kiểm tra hồi quy các bản sửa lỗi SEC-01..SEC-04.
- **R2 (`sec-eureka-network`)**: Tái thẩm định SEC-07 (Bảo mật Eureka bằng HTTP Basic Auth, credential hóa Eureka client, đóng cổng 8761, cô lập mạng nội bộ Docker với `backend-net internal: true`), và kiểm tra tính toàn vẹn cú pháp cấu hình Docker Compose (Kafka healthcheck/depends_on).
- **Mô hình tin cậy (Trust Model)**: **Trust Model A (Edge Authentication + Internal Network Isolation)**.

---

## 1. Bảng Tổng hợp Trạng thái Thẩm định (Summary Evaluation Matrix)

| Hạng mục kiểm tra | Mã phát hiện | Trạng thái (Status) | Worktree / Đường dẫn tệp & Dòng mã bằng chứng | Đánh giá kỹ thuật & Ghi chú |
|---|---|---|---|---|
| **R1 Allowlist chính xác** | **SEC-05** | **Fixed** | `sec-gateway-whitelist`:<br>`backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java:111-118` | Danh sách đường dẫn công khai đã được thu hẹp về danh sách chính xác: `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`, `/error`, `/actuator/health` (và tiền tố `/actuator/health/`). Đã loại bỏ hoàn toàn wildcard `/api/auth/**`. |
| **R1 Bắt buộc Token cho Logout** | **SEC-05** | **Fixed** | `sec-gateway-whitelist`:<br>`backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java:58-65`<br>`backend/auth-service/src/main/java/com/agriculture/auth/security/WebSecurityConfig.java:55-59`<br>`backend/auth-service/src/main/java/com/agriculture/auth/controller/AuthController.java:136-142` | `/api/auth/logout` không còn trong allowlist công khai của Gateway và không còn nằm trong `permitAll()` của `auth-service`. Request gọi logout bắt buộc phải có Bearer token hợp lệ; nếu thiếu token, Gateway lập tức từ chối 401, ngăn chặn triệt để lỗi 500 `ClassCastException`. |
| **R1 Auth-Service Scoping** | **SEC-05** | **Fixed** | `sec-gateway-whitelist`:<br>`backend/auth-service/src/main/java/com/agriculture/auth/security/WebSecurityConfig.java:55-59` | `WebSecurityConfig` đã thay thế `requestMatchers("/api/auth/**").permitAll()` bằng `.requestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/refresh").permitAll()`, các endpoint khác rơi vào `.anyRequest().authenticated()`. |
| **R1 Chuẩn hóa 401 Response** | **SEC-08** | **Fixed** | `sec-gateway-whitelist`:<br>`backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java:151-162` | Phản hồi 401 đính kèm đầy đủ header chuẩn RFC 6750: `WWW-Authenticate: Bearer error="invalid_token"`. |
| **R1 JSON Error Body** | **SEC-08** | **Fixed** | `sec-gateway-whitelist`:<br>`backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java:155, 158-161` | Đã trả về body JSON có định dạng `{"status":401,"error":"Unauthorized","message":"Authentication is required or the token is invalid"}` với `Content-Type: application/json`. |
| **R1 Security Warning Log** | **SEC-08** | **Fixed** | `sec-gateway-whitelist`:<br>`backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java:32, 156` | Ghi log cảnh báo mức `WARN` khi từ chối request unauthenticated: `LOGGER.warn("Unauthorized request to {}", exchange.getRequest().getPath().pathWithinApplication().value())`. |
| **R1 Regression Check** | **SEC-01..04** | **Fixed (No regression)** | `sec-gateway-whitelist`:<br>`backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java:49-56, 83-87`<br>`backend/api-gateway/src/main/resources/application.yml:18-34` | - Bypass preflight `OPTIONS` được duy trì nguyên vẹn.<br>- Cơ chế làm sạch danh tính client (`X-User-Id`, `X-Username`, `X-Roles`) được thực thi trước mọi bước kiểm tra.<br>- Bắt buộc `userId` khác null/blank không giá trị mặc định.<br>- Cấu hình CORS (`globalcors`) giữ nguyên vẹn. |
| **R2 Eureka Basic Auth** | **SEC-07** | **Fixed** | `sec-eureka-network`:<br>`backend/discovery-service/pom.xml:26-29`<br>`backend/discovery-service/src/main/resources/application.yml:7-10`<br>`backend/discovery-service/src/main/java/com/agriculture/discovery/SecurityConfiguration.java:1-21` | Bổ sung `spring-boot-starter-security`, thiết lập thông tin xác thực `${EUREKA_USER:eureka}` / `${EUREKA_PASSWORD:eureka}`, cấu hình `SecurityFilterChain` với `httpBasic()` và bỏ qua CSRF cho `/eureka/**`. *(Lưu ý: file `SecurityConfiguration.java` đang ở trạng thái untracked trên git)*. |
| **R2 Eureka Client Credentials** | **SEC-07** | **Fixed** | `sec-eureka-network`:<br>`backend/*/src/main/resources/application.yml` (7 client services)<br>`docker-compose.yml:98-99, 112-113, 127-128, 145-146` | Toàn bộ 7 microservice Spring Cloud (`api-gateway`, `auth-service`, `crop-service`, `forum-service`, `notification-service`, `user-service`, `weather-service`) đã được cấu hình `defaultZone: http://${EUREKA_USER:eureka}:${EUREKA_PASSWORD:eureka}@${EUREKA_HOST:localhost}:8761/eureka/`. |
| **R2 Đóng cổng Host 8761** | **SEC-07** | **Fixed** | `sec-eureka-network`:<br>`docker-compose.yml:94-102` | Khối `ports: - "8761:8761"` dưới `discovery-service` đã được xóa bỏ hoàn toàn khỏi `docker-compose.yml`. |
| **R2 Phân đoạn mạng Docker** | **SEC-07** | **Fixed** | `sec-eureka-network`:<br>`docker-compose.yml:10-15, 36-37, 47-48, 58-59, 100-101, 115-117, 134-135, 151-152, 237-239` | Tạo mạng cô lập `backend-net` với thuộc tính `internal: true`. Tất cả backend services, databases, messaging và discovery đều nằm trên `backend-net`. Duy nhất `api-gateway` kết nối đồng thời `backend-net` và `agriculture-net` và mở cổng host `8080:8080`. |
| **R2 Compose Parse Sanity** | **N/A** | **Fixed / Valid** | `sec-eureka-network`:<br>`docker-compose.yml:1-247` | Lệnh `docker compose config` phân tích cú pháp thành công không có lỗi (Exit Code: 0). |
| **R2 Kafka Healthcheck & Depends** | **N/A** | **Fixed / Preserved** | `sec-eureka-network`:<br>`docker-compose.yml:9-13, 19-21, 30-35` | Healthcheck của Zookeeper (`cub zk-ready`), ràng buộc `depends_on: zookeeper: condition: service_healthy` và healthcheck của Kafka (`cub kafka-ready`) được bảo toàn tuyệt đối. |

---

## 2. Thẩm định Chi tiết Từng Hạng mục & Bằng chứng Mã nguồn

### 2.1. Nhánh R1: `sec-gateway-whitelist` (SEC-05 & SEC-08)

#### A. SEC-05: Thu hẹp Whitelist và Bảo vệ Endpoint Logout
- **Vấn đề trước đây**: Gateway sử dụng tiền tố mở `path.startsWith("/api/auth/")` dẫn đến việc request không có token gọi vào `/api/auth/logout` được chuyển tiếp thẳng vào `auth-service`. Tại `auth-service`, `WebSecurityConfig` cấp quyền tự do `requestMatchers("/api/auth/**").permitAll()`, khiến Spring Security tạo đối tượng nặc danh (`anonymousUser`). Khi `AuthController.logoutUser()` ép kiểu sang `(UserDetailsImpl)`, mã ném ra `ClassCastException` và trả về HTTP 500 thay vì 401.
- **Bằng chứng khắc phục tại API Gateway** (`C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/sec-gateway-whitelist/backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java`):
  ```java
  // Dòng 111-118:
  private static boolean isPublicPath(String path) {
      return path.equals("/api/auth/login")
              || path.equals("/api/auth/register")
              || path.equals("/api/auth/refresh")
              || path.equals("/error")
              || path.equals("/actuator/health")
              || path.startsWith("/actuator/health/");
  }
  ```
  *Đánh giá*: Whitelist chỉ chấp nhận đúng các endpoint không cần xác thực. `/api/auth/logout` đã bị loại bỏ khỏi whitelist. Khi không có Bearer token, Gateway chặn đứng tại dòng 64 hoặc 86 và trả về HTTP 401 Unauthorized.
- **Bằng chứng khắc phục tại Auth Service** (`C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/sec-gateway-whitelist/backend/auth-service/src/main/java/com/agriculture/auth/security/WebSecurityConfig.java`):
  ```java
  // Dòng 55-59:
  .authorizeHttpRequests(auth -> auth
          .requestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/refresh").permitAll()
          .requestMatchers("/error").permitAll()
          .anyRequest().authenticated()
  );
  ```
  *Đánh giá*: Khắc phục cơ chế phòng thủ chiều sâu (Defense-in-Depth). Nếu có request lọt qua Gateway tới `auth-service`, Spring Security cũng sẽ từ chối với 401 thay vì chuyển tới `AuthController`.

#### B. SEC-08: Chuẩn hóa Phản hồi 401 & Security Logging
- **Vấn đề trước đây**: Khi token không hợp lệ, Gateway trả về HTTP 401 với thân rỗng (`setComplete()`), thiếu header chuẩn RFC 6750 và không ghi log giám sát.
- **Bằng chứng khắc phục** (`C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/sec-gateway-whitelist/backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java`):
  ```java
  // Dòng 151-162:
  private static Mono<Void> unauthorized(ServerWebExchange exchange) {
      var response = exchange.getResponse();
      response.setStatusCode(HttpStatus.UNAUTHORIZED);
      response.getHeaders().set(HttpHeaders.WWW_AUTHENTICATE, "Bearer error=\"invalid_token\"");
      response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
      LOGGER.warn("Unauthorized request to {}", exchange.getRequest().getPath().pathWithinApplication().value());

      byte[] body = "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Authentication is required or the token is invalid\"}"
              .getBytes(StandardCharsets.UTF_8);
      DataBuffer buffer = response.bufferFactory().wrap(body);
      return response.writeWith(Mono.just(buffer));
  }
  ```
  *Đánh giá*:
  1. Header `WWW-Authenticate: Bearer error="invalid_token"` tuân thủ chuẩn RFC 6750 Section 3.
  2. Thân phản hồi JSON rõ ràng với mã trạng thái, tên lỗi và thông điệp giải thích.
  3. `LOGGER.warn` hỗ trợ SIEM / SOC giám sát các nỗ lực truy cập bất hợp pháp.
  4. Mọi nhánh từ chối (dòng 64, 69, 80, 86) đều chuyển qua hàm `unauthorized(exchange)`.

#### C. Kiểm tra Hồi quy R1 (SEC-01..04 Intactness Check)
1. **OPTIONS bypass (SEC-03)**:
   - Dòng 49–51 của `JwtAuthenticationGlobalFilter.java`:
     ```java
     if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
         return chain.filter(exchange);
     }
     ```
     -> CORS Preflight tiếp tục đi qua không bị chặn.
2. **Loại bỏ Header danh tính không tin cậy từ Client (SEC-02)**:
   - Dòng 33–39, 53–56, 120–122 của `JwtAuthenticationGlobalFilter.java`:
     Loại bỏ `X-User-Id`, `X-Username`, `X-Roles` bất kể chữ hoa hay thường (`Locale.ROOT`) khỏi request của client trước khi thực hiện bất kỳ khâu xử lý hay định tuyến nào.
3. **Bắt buộc UserId không rỗng (SEC-01)**:
   - Dòng 83–87 của `JwtAuthenticationGlobalFilter.java`:
     Không có giá trị ngầm định (fallback/default value `1`). Thiếu claim `userId`/`id` lập tức kích hoạt `unauthorized(exchange)`.
4. **Cấu hình CORS Gateway (SEC-03)**:
   - File `backend/api-gateway/src/main/resources/application.yml` (dòng 18–34) giữ nguyên vẹn khối `globalcors` với đầy đủ `allowedOrigins`, `allowedMethods`, `allowedHeaders`, và `allowCredentials: true`.

---

### 2.2. Nhánh R2: `sec-eureka-network` (SEC-07 & Sanity)

#### A. SEC-07: Bảo mật Discovery Service & Credential hóa Eureka Client
1. **Kích hoạt Spring Security trên Discovery Service**:
   - `backend/discovery-service/pom.xml`: Bổ sung `spring-boot-starter-security` (dòng 26–29).
   - `backend/discovery-service/src/main/resources/application.yml`: Bổ sung thông tin xác thực từ biến môi trường (dòng 7–10):
     ```yaml
     spring:
       security:
         user:
           name: ${EUREKA_USER:eureka}
           password: ${EUREKA_PASSWORD:eureka}
     ```
   - `backend/discovery-service/src/main/java/com/agriculture/discovery/SecurityConfiguration.java`:
     ```java
     @Configuration
     public class SecurityConfiguration {
         @Bean
         SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
             http
                     .csrf(csrf -> csrf.ignoringRequestMatchers("/eureka/**"))
                     .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
                     .httpBasic(basic -> {});
             return http.build();
         }
     }
     ```
     *Đánh giá*: Bật HTTP Basic Auth cho toàn bộ request, đồng thời tắt CSRF đối với endpoint `/eureka/**`. Đây là cấu hình bắt buộc để các Eureka Client có thể đăng ký và gửi heartbeat định kỳ mà không bị lỗi 403 Forbidden.
2. **Cập nhật URI chứa credentials trên tất cả Client Services**:
   Cả 7 microservice Spring Cloud đều được cập nhật mẫu URI thống nhất:
   `defaultZone: http://${EUREKA_USER:eureka}:${EUREKA_PASSWORD:eureka}@${EUREKA_HOST:localhost}:8761/eureka/`
   - `backend/api-gateway/src/main/resources/application.yml:72`
   - `backend/auth-service/src/main/resources/application.yml:22`
   - `backend/crop-service/src/main/resources/application.yml:22`
   - `backend/forum-service/src/main/resources/application.yml:14`
   - `backend/notification-service/src/main/resources/application.yml:31`
   - `backend/user-service/src/main/resources/application.yml:22`
   - `backend/weather-service/src/main/resources/application.yml:25`
   - Trong `docker-compose.yml`, các service `api-gateway`, `auth-service`, `user-service` (và các service đã comment out) đều được tiêm biến môi trường:
     ```yaml
     - EUREKA_USER=${EUREKA_USER:-eureka}
     - EUREKA_PASSWORD=${EUREKA_PASSWORD:-eureka}
     ```

#### B. SEC-07: Cô lập Hạ tầng Docker Network & Đóng cổng Host 8761
1. **Xóa cổng 8761**:
   Trong `docker-compose.yml` (dòng 94–102), dịch vụ `discovery-service` không còn khai báo directive `ports: - "8761:8761"`. Cổng 8761 hoàn toàn biến mất khỏi host interface.
2. **Mạng nội bộ cô lập `backend-net`**:
   - Định nghĩa mạng (dòng 237–239):
     ```yaml
     networks:
       agriculture-net:
         driver: bridge
       backend-net:
         driver: bridge
         internal: true
     ```
     Thuộc tính `internal: true` đảm bảo các container trên mạng này không thể bị định tuyến trực tiếp từ bên ngoài máy chủ host và không thể truy cập thẳng ra ngoài nếu không qua Gateway.
   - Các dịch vụ nội bộ kết nối thuần túy vào `backend-net`:
     `zookeeper` (dòng 15), `kafka` (dòng 37), `postgres-auth` (dòng 48), `postgres-user` (dòng 59), `discovery-service` (dòng 101), `auth-service` (dòng 135), `user-service` (dòng 152).
   - Dịch vụ biên giới `api-gateway` (dòng 115–117) kết nối đồng thời `backend-net` (để giao tiếp nội bộ) và `agriculture-net`, và là điểm duy nhất mở cổng host:
     ```yaml
     ports:
       - "8080:8080"
     ```

#### C. Kiểm tra Tính toàn vẹn Cấu hình Docker Compose (Sanity & Kafka Healthcheck)
1. **Kiểm tra cú pháp cấu hình (`docker compose config`)**:
   - Đã thực thi lệnh `docker compose -f docker-compose.yml config` trên cây mã nguồn của `sec-eureka-network`.
   - Kết quả: Parse cú pháp thành công tuyệt đối, thoát với mã Exit Code 0, xuất cấu trúc hợp lệ cho toàn bộ dịch vụ, mạng, biến môi trường và volume.
2. **Bảo toàn Healthcheck Zookeeper & Kafka**:
   - Zookeeper (dòng 9–13): Healthcheck sử dụng `cub zk-ready localhost:2181 10` với khoảng thời gian 10s, retry 10 lần.
   - Kafka (dòng 19–21 & 30–35):
     - Directive `depends_on`:
       ```yaml
       depends_on:
         zookeeper:
           condition: service_healthy
       ```
     - Healthcheck: `cub kafka-ready -b localhost:9092 1 10` với interval 10s, retry 15 lần, start_period 20s.
     - Toàn bộ cơ chế kiểm tra trạng thái khởi động theo chuỗi (health-gated startup) được giữ nguyên vẹn.

---

## 3. Danh sách Tồn dư & Rủi ro Vận hành Cần lưu ý (Residuals & Newly Introduced Risks)

### 3.1. Các vấn đề tồn dư dự kiến (Expected Residuals)
- **SEC-06 (Vẫn để ngỏ - Expected Open)**:
  - Vấn đề: `FeignHeaderForwardingConfiguration` trong `forum-service` vẫn tự động chuyển tiếp `X-User-Id`, `X-Username`, `X-Roles` của người dùng gọi API sang các cuộc gọi nội bộ Feign tới `user-service`. Kèm theo đó là hiện tượng N+1 REST calls trong `ForumService.getAllPosts()` và `getComments()`.
  - Mức độ rủi ro: **MEDIUM**. Đã thẩm định là không rò rỉ PII nhờ `UserProfileViewDTO`, không chặn merge đợt này. Lên kế hoạch xử lý ở Sprint +1 (thêm endpoint batch `/api/users/profile/batch` và bổ sung Caffeine Cache).

### 3.2. Cảnh báo Quan trọng trước khi Hợp nhất (Pre-Merge Action Items & Technical Risks)
1. **Tệp tin chưa được theo dõi (`Untracked File`) trong Worktree `sec-eureka-network`**:
   - ⚠️ **Rủi ro nghiêm trọng**: Tệp tin `backend/discovery-service/src/main/java/com/agriculture/discovery/SecurityConfiguration.java` hiện đang ở trạng thái **UNTRACKED** (`??` trong `git status`). Các thay đổi còn lại trong cả hai worktree `sec-gateway-whitelist` và `sec-eureka-network` cũng đang ở dạng **working tree unstaged modifications**.
   - ⚠️ **Hậu quả nếu bỏ sót**: Nếu nhánh git được commit/merge mà quên lệnh `git add SecurityConfiguration.java`, `discovery-service` sẽ có dependency `spring-boot-starter-security` nhưng không có bộ lọc tắt CSRF cho `/eureka/**`. Khi đó, toàn bộ các Eureka client sẽ bị Spring Security mặc định từ chối đăng ký với mã lỗi **HTTP 403 Forbidden**, dẫn đến tê liệt khả năng định tuyến của API Gateway!
   - 🛠️ **Hành động bắt buộc (Pre-merge Action)**: Phải thực hiện `git add .` và `git commit` đầy đủ trên nhánh `veejvn/sec-eureka-network` và `veejvn/sec-gateway-whitelist` trước khi thực hiện merge.
2. **Quy trình Phát triển Cục bộ Ngoài Docker (Local Developer Workflow Impact)**:
   - Do cổng 8761 không còn được map ra host và mạng backend là `internal: true`, lập trình viên muốn chạy từng microservice đơn lẻ từ IDE (ngoài môi trường Docker) sẽ không thể kết nối tới Eureka chạy trong Docker nếu không mở cổng tạm thời hoặc sử dụng tệp `docker-compose.override.yml`. Cần bổ sung hướng dẫn này vào tài liệu hướng dẫn phát triển cục bộ (`docs/DEVELOPMENT_GUIDE.md`).

---

## 4. Kết luận Hợp nhất Tổng thể (Overall Merge-Readiness Verdict)

### **Kết luận: PASS (ĐỦ ĐIỀU KIỆN HỢP NHẤT)**

- **Tính tương thích giữa R1 và R2**:
  - Không có xung đột tệp tin (Disjoint file modifications): R1 chỉ chỉnh sửa Java filter/security trong Gateway và Auth Service; R2 chỉ chỉnh sửa YAML cấu hình, Eureka pom/security config và Docker Compose.
  - Khi ghép hai nhánh, hệ thống đạt được mô hình phòng thủ nhiều lớp hoàn chỉnh: Gateway kiểm soát biên giới bằng allowlist chặt chẽ và chuẩn RFC 6750; Eureka và các dịch vụ nội bộ được bảo vệ bởi xác thực Basic Auth và phân đoạn mạng Docker kín.
- **Tính toàn vẹn chức năng**: Các bản sửa lỗi cốt lõi SEC-01..SEC-04 không bị hồi quy; cú pháp Docker Compose hợp lệ; chuỗi khởi động phụ thuộc Zookeeper/Kafka được bảo toàn nguyên vẹn.
- **Điều kiện tiên quyết trước khi merge**: Đảm bảo commit toàn bộ các thay đổi chưa staged, đặc biệt là tệp `backend/discovery-service/src/main/java/com/agriculture/discovery/SecurityConfiguration.java`.
