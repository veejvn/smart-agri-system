# Smart Agriculture Management System - Memory Bank

## Project Overview
A production-ready microservices platform built with Spring Boot, FastAPI, Next.js, and Docker to help farmers manage crops, monitor weather, receive AI-based farming advice, and engage in community discussions.

## Architecture
The system employs a microservices architecture communicating synchronously via REST APIs (Spring Cloud Gateway, OpenFeign) and asynchronously via Kafka.

### Core Services
1. **API Gateway (Spring Cloud Gateway):** Entry point, routing, port `8080`.
2. **Discovery Service (Eureka):** Service registration, port `8761`.
3. **Auth Service:** JWT generation, User/Role management, PostgreSQL (`auth_db`), port `8081`.
4. **User Service:** User profiles, Farm locations, PostgreSQL (`user_db`), port `8082`.
5. **Crop Service:** Crop management, Farm plots, Activity logs, PostgreSQL (`crop_db`), port `8083`.
6. **Weather Service:** Weather tracking, forecasts, MongoDB (`weather_db`), Producer of `weather-alert` Kafka events, port `8084`.
7. **Forum Service:** Community posts, comments, tags, MongoDB (`forum_db`), port `8085`.
8. **Notification Service:** Real-time alerts, cross-service notifications, Consumer of `weather-alert` events, PostgreSQL (`notification_db`), port `8086`.
9. **AI Service:** FastAPI, Scikit-learn (mocked model for now) for crop recommendations and yield predictions, port `8000`.
10. **Frontend:** Next.js application, port `3000`.

### Infrastructure Dependencies
- **PostgreSQL:** Primary RDBMS for structured data (Auth, User, Crop, Notification).
- **MongoDB:** NoSQL database for flexible schemas (Weather, Forum).
- **Kafka & Zookeeper:** Event streaming for decoupled microservice communication.
- **Docker Compose:** Orchestration of all infrastructure and services.

## Development Status
- [x] Phase 1 & 2: Project Architecture and Monorepo Scaffolding
- [x] Phase 3: Infrastructure Services (Gateway & Discovery)
- [x] Phase 4: Core Backend Microservices (Auth, User, Crop, Weather, Forum, Notification)
- [x] Phase 5: AI Service Python Integration
- [x] Phase 6 & 7: Next.js Frontend Scaffold and Full Stack Docker Configuration
- [x] Phase 8: Initial Documentation

**Current State**: 
- All services are scaffolded and containerized.
- **Stitch Design Migration**: Completed converting all 12 design screens from Google Stitch into fully functional Next.js TypeScript pages using Tailwind CSS v4, TypeScript, and Lucide Icons.
- **Route Synchronization**: Renamed all Vietnamese route directories (`quan-ly-don-hang` -> `order-management`, `chuyen-gia` -> `experts`, `dat-lich` -> `book-consultation`, `chi-tiet-don-hang` -> `order-details`), refactored all internal link references (in `sidebar.tsx`, `checkout/page.tsx`, etc.), and verified that the production build (`npm run build`) compiles successfully.
- **Homepage Standardization**: Promoted the AgroStream IoT Monitoring module (`/agrostream`) to become the main entry point (homepage `/`) of the frontend application, refactored sidebar/mobile bottom navigation links, removed the redundant `/agrostream` directory, and verified successful compilation of all 14 routes.
- **Icon Library Migration**: Replaced the entire frontend icon system from Material Symbols Outlined (CDN-based) with the native `lucide-react` library. Created and executed an automated node script to map 70+ occurrences of Material Icons to proper Lucide React component syntax, and subsequently cleaned up all remaining Google Icons on the 4 pages (Knowledge, Experts, Book Consultation, AgroAI) during this session, achieving 100% migration and successful production build.
- **Frontend Layout Refactoring**: Created [DashboardLayout.tsx](file:///d:/Code/Web/microservice/smart-agriculture-system/frontend/src/components/layouts/DashboardLayout.tsx) component wrapping Sidebar + Header + Footer and applied it across all 9 internal dashboard pages (`dashboard`, `admin`, `order-management`, `order-details`, `market-trends`, `agroai`, `experts`, `book-consultation`, `knowledge`), reducing 200+ lines of duplicate layout boilerplate and eliminating hardcoded user data. Extra custom hook `useChartAnimation` was created for animated chart elements.
- **Frontend API Integration Architecture**: Created design spec (`2026-08-11-frontend-api-integration-design.md`) and implementation plan (`2026-08-11-frontend-api-integration.md`). Installed `@tanstack/react-query` & `axios`, configured `.env.local`, set up `QueryClientProvider` and `AuthContext` in root layout, created `apiClient` Axios instance with JWT request/response interceptors, created React Query hooks (`useLoginMutation`, `useRegisterMutation`, `useUserProfileQuery`, `useUpdateProfileMutation`), connected `Header` component to auth state, and verified clean production build (`npm run build`).

- **Successfully Verified**: Full flow from Register -> Login (JWT) -> Create Profile via API Gateway.
- **Recent Fixes**:
  - Resolved JSX syntax issues regarding `className` and `fontVariationSettings` properties.
  - Resolved Docker build issues using Maven-based multi-stage builds.
  - Added `DataInitializer` in Auth-Service to auto-populate roles.
  - Fixed re-login 500 error by adding `@Transactional` and stale token cleanup in `RefreshTokenService`.
  - Resolved 401/404 issues at the API Gateway level by correcting `application.yml` and permitting `/error` endpoints.
  - Successfully tested Vietnamese character support in API requests using UTF-8 encoding.
  - Fixed missing import Link and Search in community/page.tsx and order-management/page.tsx during layout refactoring.

## Execution Roadmap / Next Steps for Developer
1. **Frontend API Integration (Feature-level Hooks):** Connect remaining pages (AgroStream IoT, Knowledge, Marketplace, Forum, Experts, AgroAI) with their respective microservices APIs via React Query custom hooks.
2. **Model Training:** Replace the `mock_predictor` in `ai-service` with actual trained Scikit-learn `.pkl` models using realistic agricultural datasets (e.g., from Kaggle).
3. **Inter-Service Communication (OpenFeign):** Implement Feign clients for synchronous requests (e.g., Forum Service fetching User profile data from User Service).
4. **Security Enhancements:** Move API secrets, JWT keys, and DB passwords to a centralized Configuration Server (Spring Cloud Config) or HashiCorp Vault. Currently handled via `.env`.
5. **API Gateway Filters:** Implement a global JWT Verification filter in the Spring Cloud Gateway to authenticate requests natively before routing them, mitigating the need to parse tokens deeply in every internal microservice.
6. **CI/CD Pipeline:** Create GitHub Actions to build Docker images and push them to a registry (DockerHub/AWS ECR).

## Useful Commands
- **Start Infrastructure Providers:** `docker-compose up -d zookeeper kafka postgres-auth postgres-user postgres-crop postgres-notification mongodb`
- **Build Services:** `mvn clean package` (for Spring Boot), then `docker-compose up --build`
- **Frontend Dev Server:** `cd frontend && npm run dev`
- **Python AI Service Local:** `cd ai-service && pip install -r requirements.txt && uvicorn app.main:app --reload`
