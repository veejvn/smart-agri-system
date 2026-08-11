# Frontend & Backend API Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect Next.js Frontend with API Gateway (`http://localhost:8080/api`) and Auth/User Microservices using Axios Interceptors, TanStack React Query, and React AuthContext.

**Architecture:** A centralized Axios instance (`apiClient`) with JWT request interceptors & 401 response interceptors handles HTTP communication. React `AuthContext` maintains client auth state (`token`, `user`). `@tanstack/react-query` handles caching, refetching, and state management via custom hooks (`useAuth`, `useUser`).

**Tech Stack:** Next.js (App Router, TS), Tailwind CSS v4, `@tanstack/react-query`, `axios`, `lucide-react`.

---

### Task 1: Install Dependencies & Configure Environment

**Files:**
- Modify: `frontend/package.json`
- Create: `frontend/.env.local`

- [ ] **Step 1: Install `@tanstack/react-query` and `axios`**

Run: `cd frontend && npm install @tanstack/react-query@^5.0.0 axios@^1.7.0`
Expected: Dependencies added to `frontend/package.json`.

- [ ] **Step 2: Create environment configuration file**

Create `frontend/.env.local` with:
```env
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080/api
```

- [ ] **Step 3: Commit**

```bash
git add frontend/package.json frontend/package-lock.json frontend/.env.local
git commit -m "feat(frontend): install react-query & axios and configure env"
```

---

### Task 2: Create QueryClient & React Query Provider

**Files:**
- Create: `frontend/src/app/providers.tsx`
- Modify: `frontend/src/app/layout.tsx`

- [ ] **Step 1: Create React Query Provider component**

Create `frontend/src/app/providers.tsx`:
```tsx
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

- [ ] **Step 2: Wrap Root Layout with Providers**

Modify `frontend/src/app/layout.tsx` to wrap children in `<Providers>`:
```tsx
import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Smart Agriculture System',
  description: 'Hệ thống Quản lý Nông nghiệp Thông minh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased text-gray-900 bg-gray-50 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run build to verify compilation**

Run: `cd frontend && npm run build`
Expected: Build succeeds without errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/providers.tsx frontend/src/app/layout.tsx
git commit -m "feat(frontend): setup QueryClientProvider in root layout"
```

---

### Task 3: Create Centralized Axios HTTP Client

**Files:**
- Create: `frontend/src/lib/api-client.ts`

- [ ] **Step 1: Write `apiClient` with Interceptors**

Create `frontend/src/lib/api-client.ts`:
```typescript
import axios from 'axios';

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Token if present
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
      }
    }
    return Promise.reject(error);
  }
);
```

- [ ] **Step 2: Run build to verify types**

Run: `cd frontend && npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/lib/api-client.ts
git commit -m "feat(frontend): add centralized axios apiClient with JWT interceptors"
```

---

### Task 4: Create Auth Data Models & AuthContext Provider

**Files:**
- Create: `frontend/src/types/auth.ts`
- Create: `frontend/src/context/AuthContext.tsx`
- Modify: `frontend/src/app/providers.tsx`

- [ ] **Step 1: Define Auth Types**

Create `frontend/src/types/auth.ts`:
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

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
}
```

- [ ] **Step 2: Create AuthContext & Provider**

Create `frontend/src/context/AuthContext.tsx`:
```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types/auth';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user_data');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to parse auth storage', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: UserProfile) => {
    localStorage.setItem('access_token', newToken);
    localStorage.setItem('user_data', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

- [ ] **Step 3: Wrap AuthProvider inside Providers**

Modify `frontend/src/app/providers.tsx`:
```tsx
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/types/auth.ts frontend/src/context/AuthContext.tsx frontend/src/app/providers.tsx
git commit -m "feat(frontend): create AuthContext and wrap inside Providers"
```

---

### Task 5: Create React Query Hooks for Auth & User Services

**Files:**
- Create: `frontend/src/hooks/useAuthHooks.ts`
- Create: `frontend/src/hooks/useUserHooks.ts`

- [ ] **Step 1: Write `useAuthHooks`**

Create `frontend/src/hooks/useAuthHooks.ts`:
```typescript
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/login', payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token && data.user) {
        login(data.token, data.user);
      }
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await apiClient.post('/auth/register', payload);
      return response.data;
    },
  });
}
```

- [ ] **Step 2: Write `useUserHooks`**

Create `frontend/src/hooks/useUserHooks.ts`:
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { UserProfile } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

export function useUserProfileQuery(userId?: string) {
  const { user, isAuthenticated } = useAuth();
  const targetId = userId || user?.id;

  return useQuery({
    queryKey: ['user-profile', targetId],
    queryFn: async (): Promise<UserProfile> => {
      const response = await apiClient.get(`/users/${targetId}`);
      return response.data;
    },
    enabled: isAuthenticated && !!targetId,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (updatedData: Partial<UserProfile>) => {
      const response = await apiClient.put(`/users/${user?.id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
  });
}
```

- [ ] **Step 3: Verify Compilation**

Run: `cd frontend && npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/hooks/useAuthHooks.ts frontend/src/hooks/useUserHooks.ts
git commit -m "feat(frontend): create React Query hooks for Auth and User profile APIs"
```

---

### Task 6: Connect Auth State & User Menu to Header Component

**Files:**
- Modify: `frontend/src/components/header.tsx`

- [ ] **Step 1: Update `Header` component to read `useAuth`**

Modify `frontend/src/components/header.tsx` to display user profile when logged in, or login button when logged out:
```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Sprout, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xl tracking-tight">
          <Sprout className="w-6 h-6" />
          <span>AgroSmart</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm giải pháp, nông sản, chuyên gia..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-none rounded-full focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Actions & User Navigation */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{user.fullName || user.username}</p>
                  <p className="text-[10px] text-gray-500">{user.roles?.[0] || 'Nông dân'}</p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Đăng xuất"
                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Run build to verify compilation**

Run: `cd frontend && npm run build`
Expected: Build succeeds cleanly.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/header.tsx
git commit -m "feat(frontend): connect AuthContext state to Header component"
```

---

### Task 7: End-to-End Build & Verification

- [ ] **Step 1: Production Build Verification**

Run: `cd frontend && npm run build`
Expected: Next.js builds all 14 routes cleanly without any TypeScript errors.

- [ ] **Step 2: Commit final implementation**

```bash
git add .
git commit -m "chore(frontend): verify full api integration build readiness"
```
