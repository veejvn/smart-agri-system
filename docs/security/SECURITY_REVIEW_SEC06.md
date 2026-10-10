# Báo Cáo Tái Thẩm Định Bảo Mật: Đợt Sửa Đổi SEC-06 & Kiểm Tra Hồi Quy (SEC-01..05, SEC-07)

**Mã tài liệu**: `SECURITY_REVIEW_SEC06.md`  
**Ngày thực hiện**: 2026-10-09  
**Người thực hiện**: Antigravity Dispatched Worker (Orca Multi-Agent System)  
**Nhiệm vụ**: `task_5771938e3c4d` | **Ngữ cảnh thực thi**: `ctx_dab1645ce5a4`  
**Phạm vi đánh giá**: 
- Đợt cập nhật **SEC-06 Wave**: `sec06-user-batch` (S1 - User Service Profile Batch), `sec06-forum-feign` (S2 - Forum Service Feign Batch/Cache/Resilience), `fix-zk-healthcheck` (S3 - Docker Compose Healthcheck).
- Kiểm tra tính toàn vẹn và hồi quy (**Regression Check**): **SEC-01, SEC-02, SEC-03, SEC-04, SEC-05, SEC-07**.

---

## 1. Tóm tắt điều hành & Quyết định Hợp nhất (Executive Summary & Final Verdict)

| Chỉ số đánh giá | Kết quả | Ghi chú |
|---|---|---|
| **S1 (user-service batch endpoint)** | ✅ **Fixed** | Cung cấp `POST /api/users/profile/batch`, truy vấn repository đơn lẻ, bảo toàn `GET /{userId}`. |
| **S2 (forum-service feign/cache/resilience)** | ✅ **Fixed** | Khử Confused Deputy (`X-Service-Name`), gom batch query 1 lần, Caffeine cache + Negative cache, Resilience4j fallback. |
| **S3 (docker-compose healthchecks)** | ✅ **Fixed** | CUB timeout = 5, Docker timeout = 20s, cú pháp config chuẩn. |
| **Kiểm tra hồi quy SEC-01..05, SEC-07** | ✅ **Fixed (Intact)** | Toàn bộ các cơ chế bảo mật trước đó còn nguyên vẹn, không bị phá vỡ. |
| **Khả năng biên dịch & phân tích cú pháp** | ✅ **BUILD SUCCESS** | Maven compile sạch ở cả 2 service; docker-compose parse thành công. |
| **KẾT LUẬN MERGE-READINESS** | 🟢 **PASS** | **Sẵn sàng để hợp nhất vào nhánh chính (main).** |

---

## 2. Bảng tổng hợp trạng thái chi tiết theo từng hạng mục (Detailed Status Table)

| Mã mục | Mô tả yêu cầu kỹ thuật | Trạng thái | Worktree / Đường dẫn tệp tin | Bằng chứng mã nguồn (File & Lines) |
|---|---|---|---|---|
| **S1.1** | Endpoint `POST /api/users/profile/batch` nhận body `userIds`, trả về `List<UserProfileViewDTO>` | **Fixed** | `sec06-user-batch`<br>`backend/user-service` | `backend/user-service/src/main/java/com/agriculture/user/controller/UserProfileController.java#L42-L46`<br>`backend/user-service/src/main/java/com/agriculture/user/dto/UserProfileBatchRequestDTO.java#L8-L10` |
| **S1.2** | Nạp dữ liệu trong một truy vấn Repository duy nhất (`single repository call`) | **Fixed** | `sec06-user-batch`<br>`backend/user-service` | `backend/user-service/src/main/java/com/agriculture/user/service/UserProfileService.java#L23-L27`<br>`backend/user-service/src/main/java/com/agriculture/user/repository/UserProfileRepository.java#L14` |
| **S1.3** | Endpoint đơn lẻ `GET /api/users/profile/{userId}` không thay đổi | **Fixed** | `sec06-user-batch`<br>`backend/user-service` | `backend/user-service/src/main/java/com/agriculture/user/controller/UserProfileController.java#L33-L40` |
| **S2.1** | Feign interceptor loại bỏ forward `X-User-Id/X-Username/X-Roles`, gửi `X-Service-Name: forum-service` | **Fixed** | `sec06-forum-feign`<br>`backend/forum-service` | `backend/forum-service/src/main/java/com/agriculture/forum/config/FeignHeaderForwardingConfiguration.java#L10-L13` |
| **S2.2** | `getAllPosts`/`getComments` nạp danh sách author qua DUY NHẤT một cuộc gọi batch (không per-item) | **Fixed** | `sec06-forum-feign`<br>`backend/forum-service` | `backend/forum-service/src/main/java/com/agriculture/forum/service/ForumService.java#L39-L47, L68-L76, L113-L163` |
| **S2.3** | Bộ đệm Caffeine cache hỗ trợ tra cứu thông tin tác giả | **Fixed** | `sec06-forum-feign`<br>`backend/forum-service` | `backend/forum-service/src/main/java/com/agriculture/forum/config/CacheConfiguration.java#L17-L23`<br>`backend/forum-service/pom.xml#L41-L44` |
| **S2.4** | Resilience4j Circuit Breaker bọc Feign client và xử lý lỗi mềm | **Fixed** | `sec06-forum-feign`<br>`backend/forum-service` | `backend/forum-service/src/main/java/com/agriculture/forum/client/UserProfileClient.java#L11-L16`<br>`backend/forum-service/src/main/java/com/agriculture/forum/client/UserProfileClientFallback.java#L10-L16`<br>`backend/forum-service/src/main/resources/application.yml#L7-L10, L15-L23` |
| **S3.1** | Mở rộng timeout healthcheck Zookeeper (cub = 5, healthcheck timeout = 20s) | **Fixed** | `fix-zk-healthcheck`<br>`docker-compose.yml` | `docker-compose.yml#L9-L13` |
| **S3.2** | Mở rộng timeout healthcheck Kafka (cub = 5, healthcheck timeout = 20s, start_period = 30s) | **Fixed** | `fix-zk-healthcheck`<br>`docker-compose.yml` | `docker-compose.yml#L30-L36` |
| **S3.3** | Cú pháp `docker-compose.yml` hợp lệ khi parse | **Fixed** | `fix-zk-healthcheck`<br>`docker-compose.yml` | `docker compose -f docker-compose.yml config -q` (Exit Code 0) |
| **REG-01** | **SEC-01**: Gateway bắt buộc `userId`, controller bắt buộc header `X-User-Id` | **Fixed (Intact)** | `review-sec06`<br>`main` | `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java#L83-L87`<br>Tất cả các controller trong `user-service`, `crop-service`, `forum-service`, `notification-service` |
| **REG-02** | **SEC-02**: Xóa bỏ header danh tính giả mạo từ client (Identity Strip) | **Fixed (Intact)** | `review-sec06`<br>`main` | `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java#L53-L56, L120-L122` |
| **REG-03** | **SEC-03**: Cho phép preflight `OPTIONS` và cấu hình CORS đầy đủ | **Fixed (Intact)** | `review-sec06`<br>`main` | `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java#L49-L51`<br>`backend/api-gateway/src/main/resources/application.yml#L18-L34` |
| **REG-04** | **SEC-04**: Đồng bộ cấu hình bí mật `APP_JWT_SECRET` | **Fixed (Intact)** | `review-sec06`<br>`main` | `backend/auth-service/src/main/resources/application.yml#L26`<br>`backend/api-gateway/src/main/resources/application.yml#L7`<br>`docker-compose.yml#L114, L133` |
| **REG-05** | **SEC-05**: Whitelist công khai so khớp chính xác, bảo vệ `POST /api/auth/logout` | **Fixed (Intact)** | `review-sec06`<br>`main` | `backend/api-gateway/src/main/java/com/agriculture/gateway/security/JwtAuthenticationGlobalFilter.java#L111-L118`<br>`backend/auth-service/src/main/java/com/agriculture/auth/security/WebSecurityConfig.java#L56-L59`<br>`backend/auth-service/src/main/java/com/agriculture/auth/controller/AuthController.java#L136-L142` |
| **REG-07** | **SEC-07**: Eureka HTTP Basic auth & Phân tách mạng nội bộ (`backend-net`) | **Fixed (Intact)** | `review-sec06`<br>`main` | `backend/discovery-service/src/main/java/com/agriculture/discovery/SecurityConfiguration.java#L12-L18`<br>`docker-compose.yml#L237-L239` (`backend-net internal: true`) |

---

## 3. Phân tích Chuyên sâu Đợt Sửa Đổi SEC-06 (Wave Deep-Dive)

### 3.1. S1: Batch Profile Endpoint trong User Service (`sec06-user-batch`)
- **Vị trí**: Worktree `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/sec06-user-batch`
- **Mã nguồn thẩm tra**:
  - DTO `UserProfileBatchRequestDTO.java`:
    ```java
    package com.agriculture.user.dto;
    import lombok.Data;
    import java.util.List;
    @Data
    public class UserProfileBatchRequestDTO {
        private List<Long> userIds;
    }
    ```
  - Repository `UserProfileRepository.java`:
    ```java
    List<UserProfile> findAllByUserIdIn(List<Long> userIds);
    ```
    Spring Data JPA sinh truy vấn SQL: `SELECT * FROM user_profiles WHERE user_id IN (?)`. Chỉ thực thi 1 round-trip database duy nhất.
  - Service `UserProfileService.java`:
    ```java
    public List<UserProfileViewDTO> getProfilesByUserIds(List<Long> userIds) {
        return userProfileRepository.findAllByUserIdIn(userIds).stream()
                .map(UserProfileViewDTO::from)
                .toList();
    }
    ```
    Chuyển đổi sang `UserProfileViewDTO` an toàn, chỉ chứa `userId`, `fullName`, `avatarUrl`, `bio`; không lộ email hay dữ liệu cá nhân nhạy cảm khác.
  - Controller `UserProfileController.java`:
    ```java
    @PostMapping("/batch")
    public ResponseEntity<List<UserProfileViewDTO>> getProfilesByUserIds(
            @RequestBody UserProfileBatchRequestDTO request) {
        return ResponseEntity.ok(userProfileService.getProfilesByUserIds(request.getUserIds()));
    }
    ```
  - Tính nguyên vẹn của GET đơn lẻ (`UserProfileController.java#L33-L40`): Hoàn toàn giữ nguyên logic ban đầu, trả về `UserProfileViewDTO.from(profile)` khi tìm thấy hoặc `404 Not Found`.

### 3.2. S2: Tối ưu Feign, Bộ đệm và Khả năng chịu lỗi trong Forum Service (`sec06-forum-feign`)
- **Vị trí**: Worktree `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/sec06-forum-feign`
- **Triệt tiêu Confused Deputy (`FeignHeaderForwardingConfiguration.java`)**:
  - Mã nguồn đã xóa bỏ hoàn toàn bộ trích xuất header từ ngữ cảnh HTTP caller (`RequestContextHolder`), thay thế bằng:
    ```java
    @Bean
    public RequestInterceptor serviceIdentityInterceptor() {
        return template -> template.header("X-Service-Name", "forum-service");
    }
    ```
  - Nhờ đó, Feign client không bao giờ bị rò rỉ hoặc mạo nhận `X-User-Id` của người đang duyệt diễn đàn khi truy vấn thông tin của các tác giả khác.
- **Khử bỏ N+1 REST Calls (`ForumService.java`)**:
  - Thay vì gọi HTTP riêng lẻ trong từng vòng lặp map post/comment, phương thức `getAuthorProfiles(Collection<Long> authorIds)`:
    1. Thu thập tất cả ID tác giả, loại bỏ null và khử trùng lặp qua `LinkedHashSet<Long>`.
    2. Kiểm tra bộ đệm `Caffeine` (`authorProfiles.get(authorId)`).
    3. Chỉ gom các ID chưa có trong bộ đệm (`uncachedAuthorIds`) thành **MỘT** request Feign `userProfileClient.getProfilesByUserIds(...)`.
    4. Trả về `Map<Long, AuthorProfileDTO> authors`, các phương thức `toPostResponse` và `toCommentResponse` chỉ lấy dữ liệu tác giả qua O(1) in-memory hash map lookup.
- **Bộ đệm Caffeine (`CacheConfiguration.java` & `ForumService.java`)**:
  - Cấu hình cache `authorProfiles`: kích thước tối đa 10,000 bản ghi, tự động hết hạn sau 10 phút ghi (`expireAfterWrite(Duration.ofMinutes(10))`).
  - **Negative Caching**: Nếu một `authorId` không tồn tại trong `user-service`, `ForumService` lưu `Optional.empty()` vào cache (dòng 154). Ở các lượt truy vấn tiếp theo, `authorProfiles.get(authorId)` trả về đối tượng `Optional.empty()`, ngăn chặn triệt để hiện tượng Cache Penetration liên tục gọi sang `user-service`.
- **Resilience4j Circuit Breaker & Graceful Degradation**:
  - Khai báo Feign Client với fallback class: `UserProfileClientFallback.class`.
  - Khi circuit breaker mở hoặc service sập, fallback ném `UserProfileUnavailableException`.
  - Khối `try-catch` trong `ForumService.java#L157-L159` bắt `RuntimeException` và nuốt ngoại lệ một cách chủ động: Diễn đàn vẫn trả về bài viết và bình luận nguyên vẹn cho người dùng (thông tin tác giả có thể hiển thị rỗng tạm thời thay vì sập toàn bộ diễn đàn với mã lỗi 500).

### 3.3. S3: Tinh chỉnh Healthcheck Timeout trong Docker Compose (`fix-zk-healthcheck`)
- **Vị trí**: Worktree `C:/Users/Hoang Ve/orca/workspaces/smart-agriculture-system/fix-zk-healthcheck`
- **Mã nguồn đã điều chỉnh (`docker-compose.yml`)**:
  - `zookeeper`:
    ```yaml
    healthcheck:
      test: ["CMD-SHELL", "cub zk-ready localhost:2181 5"]
      interval: 10s
      timeout: 20s
      retries: 10
    ```
  - `kafka`:
    ```yaml
    healthcheck:
      test: ["CMD-SHELL", "cub kafka-ready -b localhost:9092 1 5"]
      interval: 10s
      timeout: 20s
      retries: 15
      start_period: 30s
    ```
  - **Ý nghĩa kỹ thuật**: Trước đây, tham số timeout bên trong lệnh CUB là `10` và timeout của Docker là `10s`. Khi hệ thống khởi động chậm, lệnh CUB chạy quá sát hoặc bằng timeout ngoài của Docker khiến Docker kill tiến trình healthcheck sớm, dẫn đến trạng thái `unhealthy` giả. Việc giảm CUB timeout xuống `5` và nới rộng Docker timeout lên `20s` (cùng `start_period: 30s`) giúp đảm bảo Kafka/Zookeeper có đủ thời gian khởi động ổn định.
  - Đã kiểm tra cú pháp bằng `docker compose -f docker-compose.yml config -q` -> Trả về thành công không lỗi.

---

## 4. Kiểm tra Hồi quy Bảo mật Toàn diện (Regression Check SEC-01 .. 05, SEC-07)

1. **SEC-01 (Bắt buộc userId tại Gateway & Header X-User-Id tại Controller)**:
   - Tại `api-gateway`: `JwtAuthenticationGlobalFilter.java` dòng 83-87 kiểm tra nghiêm ngặt `userIdClaim`. Nếu token thiếu `userId` hoặc `id`, Gateway trả về ngay 401 Unauthorized (`Authentication is required or the token is invalid`).
   - Tại các Controller: Tất cả các endpoint nghiệp vụ yêu cầu định danh người dùng trong toàn bộ dự án (`FarmPlotController`, `ForumController`, `NotificationController`, `FarmLocationController`, `UserProfileController`) đều khai báo `@RequestHeader("X-User-Id") Long userId` mà không có `defaultValue`. Lỗ hổng gán ngầm quyền quản trị viên (`defaultValue = "1"`) đã bị xóa sổ vĩnh viễn.
2. **SEC-02 (Loại bỏ Header giả mạo danh tính - Identity Strip)**:
   - Tại `JwtAuthenticationGlobalFilter.java` dòng 53-56 và 120-122: Bộ lọc biên giới thực hiện xóa sạch tất cả header `X-User-Id`, `X-Username`, `X-Roles` từ phía HTTP request bên ngoài trước khi thực hiện bất kỳ bước định tuyến hoặc cấp quyền nào. Ngăn chặn tuyệt đối việc kẻ tấn công tự tiêm header giả mạo danh tính qua Internet.
3. **SEC-03 (Hỗ trợ CORS Preflight OPTIONS)**:
   - Tại `JwtAuthenticationGlobalFilter.java` dòng 49-51: Bỏ qua kiểm tra JWT đối với các HTTP request có method là `OPTIONS`.
   - Tại `api-gateway/src/main/resources/application.yml` dòng 18-34: Cấu hình `spring.cloud.gateway.globalcors` cho phép origin `http://localhost:3000` với đầy đủ các phương thức GET, POST, PUT, PATCH, DELETE, OPTIONS và các header `Authorization`, `Content-Type`.
4. **SEC-04 (Đồng bộ cấu hình APP_JWT_SECRET)**:
   - `auth-service` và `api-gateway` đều tham chiếu biến môi trường `${APP_JWT_SECRET}` với cùng fallback secret `926D96C90030DD58429D2751AC1BDBBC926D96C90030DD58429D2751AC1BDBBC`.
   - `docker-compose.yml` truyền biến `${JWT_SECRET}` đồng bộ cho cả hai container.
5. **SEC-05 (Exact Allowlist & Bảo vệ POST /api/auth/logout)**:
   - `JwtAuthenticationGlobalFilter.java` dòng 111-118 so khớp chính xác:
     - `/api/auth/login`
     - `/api/auth/register`
     - `/api/auth/refresh`
     - `/error`
     - `/actuator/health` và `/actuator/health/*`
   - Endpoint `/api/auth/logout` không nằm trong danh sách công khai. Nó bắt buộc phải có token hợp lệ tại Gateway (tránh lỗi 500 do thiếu token) và được cấu hình `authenticated()` trong `WebSecurityConfig.java#L58` của `auth-service`.
6. **SEC-07 (Eureka HTTP Basic Auth & Cô lập mạng nội bộ Docker)**:
   - `discovery-service` kích hoạt HTTP Basic Authentication qua `SecurityConfiguration.java`.
   - Tất cả microservice kết nối với Eureka bằng thông tin xác thực `${EUREKA_USER}:${EUREKA_PASSWORD}`.
   - `docker-compose.yml` định nghĩa mạng `backend-net` với thuộc tính `internal: true`. Ngoại trừ `api-gateway` (cổng 8080) và `frontend` (cổng 3000), các dịch vụ backend không mở port ra host, loại bỏ rủi ro bypass API Gateway.

---

## 5. Đánh giá Rủi ro Kỹ thuật & Tồn dư Phi Chặn (Residual Risk & Edge Cases)

Trong quá trình phân tích mã nguồn chi tiết, các khía cạnh tiềm ẩn đã được xem xét và kết luận như sau:

1. **Thứ tự của kết quả Batch Query (Batch Ordering)**:
   - *Phân tích*: Truy vấn SQL `findAllByUserIdIn` không đảm bảo thứ tự của các bản ghi trả về trùng với thứ tự mảng `userIds` đầu vào.
   - *Đánh giá an toàn*: `ForumService` không dựa vào index của mảng mà nạp toàn bộ kết quả vào một `Map<Long, AuthorProfileDTO>` theo key `profile.getUserId()`. Sau đó, việc gán author cho từng bài viết/bình luận được thực hiện qua `authors.get(id)`. Do đó, thứ tự trả về của database không ảnh hưởng tới tính đúng đắn của dữ liệu.
2. **Tính nhất quán của Key trong Bộ đệm (Cache Key Correctness)**:
   - *Phân tích*: Kiểu dữ liệu của `authorId` trong Post/Comment là `Long`. Key trong `CacheConfiguration` và `ForumService` được truyền trực tiếp là `Long`.
   - *Đánh giá an toàn*: Không xảy ra hiện tượng lệch kiểu (chẳng hạn như giữa `String` và `Long`), cơ chế băm `equals/hashCode` của Java `Long` đảm bảo tính chính xác 100%.
3. **Sự phụ thuộc thư viện (Dependency Resolution)**:
   - Đã kiểm tra cây phụ thuộc `dependency:tree` của `forum-service`: Thư viện `spring-cloud-starter-circuitbreaker-resilience4j` (bản 3.1.1/2.1.0) và `caffeine` (bản 3.1.8) cùng `spring-boot-starter-cache` (được kéo ngầm từ loadbalancer) đều hiện diện đầy đủ, không thiếu sót class ở runtime.
4. **Khuyến nghị cải tiến tương lai (Tồn dư phi chặn - Minor Non-blocking Residuals)**:
   - Trong `UserProfileController.java`: Chưa có kiểm tra `null` nếu client gửi request body rỗng `{ "userIds": null }`. Khuyến nghị thêm validation `@Valid` hoặc kiểm tra điều kiện `if (request == null || request.getUserIds() == null) return ResponseEntity.ok(Collections.emptyList());` để tránh ngoại lệ tiềm ẩn ở tầng database trong các phiên bản sau.

---

## 6. Kết luận (Final Recommendation)

Toàn bộ các yêu cầu của đợt sửa đổi **SEC-06 Wave** (S1, S2, S3) đã được thực hiện chính xác, sạch sẽ, giải quyết triệt để vấn đề hiệu năng N+1 REST calls và nguy cơ rò rỉ ngữ cảnh người gọi Confused Deputy. Đồng thời, toàn bộ các bản vá bảo mật trước đó (**SEC-01 đến SEC-05 và SEC-07**) vẫn được duy trì nguyên vẹn.

**Khuyến nghị:** Tiến hành hợp nhất (**MERGE**) các thay đổi từ 3 worktree nhánh vào nhánh chính.
