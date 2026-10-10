import { describe, it, expect, beforeEach } from 'vitest';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from './api-client';

function okAdapter(capture: (config: AxiosRequestConfig) => void) {
  return async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    capture(config);
    return { data: {}, status: 200, statusText: 'OK', headers: {}, config };
  };
}

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('attaches the Bearer token from localStorage on requests', async () => {
    localStorage.setItem('access_token', 'test-token');
    let captured: AxiosRequestConfig | undefined;
    apiClient.defaults.adapter = okAdapter((c) => (captured = c));

    await apiClient.get('/ping');

    expect((captured?.headers as Record<string, unknown>)?.Authorization).toBe('Bearer test-token');
  });

  it('does not attach an Authorization header when there is no token', async () => {
    let captured: AxiosRequestConfig | undefined;
    apiClient.defaults.adapter = okAdapter((c) => (captured = c));

    await apiClient.get('/ping');

    expect((captured?.headers as Record<string, unknown>)?.Authorization).toBeUndefined();
  });

  it('clears stored tokens when a 401 response is received', async () => {
    localStorage.setItem('access_token', 'expired');
    localStorage.setItem('user_data', '{"id":1}');
    apiClient.defaults.adapter = async (config: AxiosRequestConfig) => {
      const error = new Error('Unauthorized') as Error & { response: unknown; config: unknown };
      error.response = { status: 401 };
      error.config = config;
      throw error;
    };

    await expect(apiClient.get('/secure')).rejects.toBeTruthy();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('user_data')).toBeNull();
  });
});
