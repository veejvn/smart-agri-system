import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { mapLoginResponse } from '@/lib/auth-mapper';
import { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/login', payload);
      return mapLoginResponse(response.data);
    },
    onSuccess: (data) => {
      login(data.token, data.user);
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
