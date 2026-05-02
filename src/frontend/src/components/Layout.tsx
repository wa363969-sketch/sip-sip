import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, User } from "lucide-react";
import type { ReactNode } from "react";
import { CartSidebar } from "./CartSidebar";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/orders", label: "My Orders" },
] as const;

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { totalItems, toggleCart } = useCart();
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 transition-smooth"
            data-ocid="nav.logo_link"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-float">
              <span className="text-primary-foreground text-xl">✦</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              Little Wonders
            </span>
          </Link>

          <nav
            className="flex items-center gap-1 ml-4"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ to, label }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`nav.${label.toLowerCase().replace(/ /g, "_")}_link`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={toggleCart}
              aria-label="Open cart"
              data-ocid="nav.cart_button"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground rounded-full"
                  data-ocid="nav.cart_badge"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </Badge>
              )}
            </Button>

            <Button
              type="button"
              variant={isAuthenticated ? "outline" : "default"}
              size="sm"
              onClick={isAuthenticated ? logout : login}
              disabled={isLoading}
              className={`rounded-full transition-smooth ${
                isAuthenticated
                  ? ""
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
              data-ocid="nav.auth_button"
            >
              <User className="w-4 h-4 mr-1.5" />
              {isLoading
                ? "Loading\u2026"
                : isAuthenticated
                  ? "Sign Out"
                  : "Sign In"}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm">✦</span>
              </div>
              <span className="font-display font-semibold text-foreground">
                Little Wonders
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              \u00a9 {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <CartSidebar />
    </div>
  );
}
