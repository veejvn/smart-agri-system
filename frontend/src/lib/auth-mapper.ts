import { AuthResponse, UserProfile } from '@/types/auth';

/**
 * Raw payload returned by auth-service POST /api/auth/login (JwtAuthenticationResponse).
 * Also tolerates the legacy { token, user } shape.
 */
export interface RawLoginResponse {
  accessToken?: string;
  refreshToken?: string;
  type?: string;
  id?: number | string;
  username?: string;
  email?: string;
  roles?: string[];
  // legacy
  token?: string;
  user?: UserProfile;
}

export function mapLoginResponse(raw: RawLoginResponse): AuthResponse {
  if (raw.token && raw.user) {
    return { token: raw.token, user: raw.user };
  }

  const user: UserProfile = {
    id: raw.id != null ? String(raw.id) : '',
    username: raw.username ?? '',
    email: raw.email ?? '',
    roles: raw.roles ?? [],
  };

  return { token: raw.accessToken ?? '', user };
}
