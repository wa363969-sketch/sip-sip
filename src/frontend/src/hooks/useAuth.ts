import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principalId = identity?.getPrincipal().toString();

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isLoading: isInitializing || isLoggingIn,
    identity,
    principalId,
    loginStatus,
    login: handleLogin,
    logout: handleLogout,
  };
}
