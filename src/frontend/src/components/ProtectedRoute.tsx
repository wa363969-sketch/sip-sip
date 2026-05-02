import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing, login } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex flex-col gap-4 p-8 max-w-xl mx-auto mt-16">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
        <p className="font-display text-2xl font-bold">Sign in to continue</p>
        <p className="text-muted-foreground">
          You need to be signed in to view this page.
        </p>
        <Button
          type="button"
          className="bg-primary text-primary-foreground rounded-2xl px-8"
          onClick={login}
          data-ocid="protected.login_button"
        >
          Sign In with Internet Identity
        </Button>
        <Link
          to="/"
          className="text-sm text-primary hover:underline"
          data-ocid="protected.home_link"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (adminOnly) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
        <p className="font-display text-2xl font-bold">Access Denied</p>
        <Link
          to="/"
          className="text-sm text-primary hover:underline"
          data-ocid="protected.home_link"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
