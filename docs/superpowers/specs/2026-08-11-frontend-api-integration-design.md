# Design Specification: Frontend & Backend API Integration

**Date:** 2026-08-11  
**Project:** Smart Agriculture Management System  
**Module:** Next.js Frontend Integration with Microservices API Gateway  

---

## 1. Overview & Architecture Goal

The goal of this design is to establish a robust, production-ready API integration layer for the Next.js frontend application, connecting it to the Spring Cloud Gateway (`http://localhost:8080/api`) and underlying microservices (Auth Service, User Service, Crop Service, Weather Service, Forum Service, AI Service).

### Selected Architecture Pattern
- **HTTP Client:** Centralized Axios instance (`apiClient`) with Request/Response Interceptors for JWT authorization headers and global error handling.
- **Server State Management:** TanStack React Query (`@tanstack/react-query`) for query caching, automatic refetching, and background synchronization.
- **Client Auth State Management:** React Context (`AuthContext`) for application-wide authentication state (token persistence in `localStorage`, user session state, login/logout actions).
- **Initial Focus:** Authentication & User Profile services (Auth Service on `:8081` & User Service on `:8082` via Gateway on `:8080`).

---

## 2. Component Design & Interfaces

### 2.1 Dependencies & Environment Configuration

**Dependencies (`frontend/package.json`):**
- `axios` (v1.x)
- `@tanstack/react-query` (v5.x)

**Environment Variables (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080/api
```

### 2.2 Global React Query Provider
- **File:** `frontend/src/app/providers.tsx`
- **Purpose:** Wraps root layout in `QueryClientProvider` and `AuthProvider`.
- **QueryClient Default Options:**
  - `staleTime`: 5 minutes (`300000` ms)
  - `retry`: 1 retry on failure

### 2.3 Centralized Axios HTTP Client
- **File:** `frontend/src/lib/api-client.ts`
- **Features:**
  - Base URL configured from `process.env.NEXT_PUBLIC_API_GATEWAY_URL`.
  - **Request Interceptor:** Reads `access_token` from `localStorage` and appends `Authorization: Bearer <token>` to headers if available.
  - **Response Interceptor:** Parses backend standard response payload `{ status, message, data }`. Catches HTTP `401 Unauthorized` responses to clear invalid tokens and reset auth state.

### 2.4 Application Auth Context & Provider
- **File:** `frontend/src/context/AuthContext.tsx`
- **Data Models (`src/types/auth.ts`):**
  ```typescript
  export interface UserProfile {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    phone?: string;
    avatarUrl?: string;
    roles: string[];
  }

  export interface AuthState {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  ```
- **Context Methods:**
  - `login(token: string, user: UserProfile)`: Saves token and user to `localStorage` & context state.
  - `logout()`: Clears `localStorage`, resets context state, clears React Query cache (`queryClient.clear()`), and navigates to `/`.

### 2.5 Custom React Query Hooks

**Auth Hooks (`frontend/src/hooks/useAuth.ts`):**
- `useLoginMutation()`: Calls `POST /auth/login`. On success, executes `login(data.token, data.user)`.
- `useRegisterMutation()`: Calls `POST /auth/register`. On success, triggers user notification/login flow.

**User Hooks (`frontend/src/hooks/useUser.ts`):**
- `useUserProfileQuery(userId)`: Calls `GET /users/{userId}` or `GET /users/me`. Enabled only when `isAuthenticated` is true.
- `useUpdateProfileMutation()`: Calls `PUT /users/{userId}` to update farmer details. Invalidates `useUserProfileQuery` cache key on success.

### 2.6 UI Component Integration
- **Header Component (`src/components/header.tsx`):** Reads `useAuth()` state. Shows User Avatar & Name dropdown with Logout button when authenticated; shows "Đăng nhập / Đăng ký" button when unauthenticated.
- **Login Modal / Auth Pages:** Integrated with `useLoginMutation` and `useRegisterMutation`, featuring loading states (`isPending`), error banners, and form validation.

---

## 3. Data Flow

```
[ UI Component / Header ]
        │
        ▼
 [ React Query Hook ] (useLoginMutation / useUserProfileQuery)
        │
        ▼
  [ apiClient ] (Axios Instance)
        │ ── (Injects Authorization: Bearer <token>)
        ▼
[ API Gateway: 8080 ] (/api/auth/*, /api/users/*)
        │
        ├──► [ Auth Service: 8081 ]
        └──► [ User Service: 8082 ]
```

---

## 4. Error Handling & Edge Cases

1. **Gateway Connection Refused (Backend Down):** Interceptor catches network errors (`ERR_CONNECTION_REFUSED`) and returns a user-friendly error message ("Không thể kết nối đến máy chủ API").
2. **Expired / Invalid Token (HTTP 401):** Interceptor automatically purges stale `access_token` from `localStorage` and triggers logout flow.
3. **Invalid Credentials (HTTP 400/404):** Error payload parsed and exposed to UI forms via React Query `error.response?.data?.message`.

---

## 5. Verification Plan

- **Automated Verification:**
  - Run `npm run build` in `frontend/` directory to ensure strict TypeScript compilation without type mismatch errors.
- **Manual Verification:**
  - Launch API Gateway, Auth Service, User Service, and Next.js frontend.
  - Perform user registration and verify database entry in `auth_db` / `user_db`.
  - Perform user login, verify JWT token storage in browser `localStorage`, and check Header username update.
