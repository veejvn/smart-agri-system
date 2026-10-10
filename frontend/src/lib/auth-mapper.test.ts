import { describe, it, expect } from 'vitest';
import { mapLoginResponse } from './auth-mapper';

describe('mapLoginResponse', () => {
  it('maps the backend JwtAuthenticationResponse to { token, user }', () => {
    const result = mapLoginResponse({
      accessToken: 'jwt-abc',
      refreshToken: 'ref',
      type: 'Bearer',
      id: 7,
      username: 'alice',
      email: 'alice@example.com',
      roles: ['ROLE_USER'],
    });

    expect(result.token).toBe('jwt-abc');
    expect(result.user).toEqual({
      id: '7',
      username: 'alice',
      email: 'alice@example.com',
      roles: ['ROLE_USER'],
    });
  });

  it('defaults roles to an empty array and id to an empty string', () => {
    const result = mapLoginResponse({ accessToken: 't' });
    expect(result.user.roles).toEqual([]);
    expect(result.user.id).toBe('');
  });

  it('passes through the legacy { token, user } shape', () => {
    const legacyUser = { id: '1', username: 'bob', email: 'b@x.com', roles: ['ROLE_ADMIN'] };
    const result = mapLoginResponse({ token: 'legacy', user: legacyUser });
    expect(result).toEqual({ token: 'legacy', user: legacyUser });
  });
});
