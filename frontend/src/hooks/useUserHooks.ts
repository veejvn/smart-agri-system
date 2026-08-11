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
