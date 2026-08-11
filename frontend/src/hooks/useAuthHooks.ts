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
