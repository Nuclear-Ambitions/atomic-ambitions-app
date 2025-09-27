import { useAuthStore } from '@/lib/stores/auth-store';

/**
 * Hook to manage authentication state and provide easy access to auth status
 * Use checkAuthStatus() manually when needed to avoid infinite loops
 */
export const useAuth = () => {
  const {
    user,
    isSignedIn,
    isLoading,
    checkAuthStatus,
    signOut,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission
  } = useAuthStore();

  return {
    user,
    isSignedIn,
    isLoading,
    checkAuthStatus,
    signOut,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
  };
};
