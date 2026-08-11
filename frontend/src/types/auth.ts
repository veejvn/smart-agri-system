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
