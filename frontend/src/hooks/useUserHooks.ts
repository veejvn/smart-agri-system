import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ProfileDetails, UpdateProfilePayload } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

/**
 * Fetches a user profile from user-service.
 * - No argument: the authenticated user's own profile via GET /users/profile
 *   (the gateway injects the X-User-Id header from the JWT).
 * - With a userId: another user's public profile via GET /users/profile/{userId}.
 */
export function useUserProfileQuery(userId?: string | number) {
  const { user, isAuthenticated } = useAuth();
  const targetId = userId ?? user?.id;
  const viewingSelf = userId == null;

  return useQuery({
    queryKey: ['user-profile', targetId],
    queryFn: async (): Promise<ProfileDetails> => {
      const url = viewingSelf ? '/users/profile' : `/users/profile/${targetId}`;
      const response = await apiClient.get(url);
      return response.data;
    },
    enabled: isAuthenticated && !!targetId,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload): Promise<ProfileDetails> => {
      const response = await apiClient.put('/users/profile', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
  });
}
