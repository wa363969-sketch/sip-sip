import type { OrderStatus } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { ORDER_STATUS_LABELS, formatPrice } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, ClipboardList } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

// Color map per requirements: placed=blue, preparing=amber, ready=green, pickedUp=gray
const STATUS_BADGE: Record<
  OrderStatus,
  { bg: string; dot: string; text: string }
> = {
  placed: {
    bg: "bg-accent/20 text-accent-foreground",
    dot: "bg-accent",
    text: "Order Placed",
  },
  preparing: {
    bg: "bg-secondary/60 text-secondary-foreground",
    dot: "bg-secondary-foreground",
    text: "Preparing",
  },
  ready: {
    bg: "bg-primary/15 text-primary",
    dot: "bg-primary",
    text: "Ready for Pickup",
  },
  pickedUp: {
    bg: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    text: "Picked Up",
  },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const s = STATUS_BADGE[status];
  return (
    <Badge
      className={`${s.bg} border-0 rounded-full flex items-center gap-1.5 px-3 py-1`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} flex-shrink-0`} />
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
}

function formatOrderDate(ns: number | bigint): string {
  const ms = Number(ns) > 1e15 ? Number(ns) / 1_000_000 : Number(ns);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Orders() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { orders, isLoading } = useOrders();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (isLoading || authLoading) {
    return (
      <div
        className="container max-w-2xl mx-auto px-4 py-10 space-y-4"
        data-ocid="orders.loading_state"
      >
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-6 w-28 mb-2" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="container max-w-2xl mx-auto px-4 py-10"
      data-ocid="orders.page"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-3xl font-bold mb-1">My Orders</h1>
        <p className="text-muted-foreground text-sm mb-8">
          {orders.length > 0
            ? `${orders.length} order${orders.length !== 1 ? "s" : ""} total`
            : "Your order history lives here"}
        </p>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-24 gap-5 text-center"
          data-ocid="orders.empty_state"
        >
          <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center shadow-toy">
            <ClipboardList className="w-12 h-12 text-muted-foreground" />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold">No orders yet</p>
            <p className="text-muted-foreground mt-1 text-sm max-w-xs">
              Once you place your first order, you'll be able to track it right
              here.
            </p>
          </div>
          <Button
            asChild
            className="bg-primary text-primary-foreground rounded-2xl px-8 shadow-toy hover:shadow-toy-hover transition-smooth"
            data-ocid="orders.browse_menu_button"
          >
            <Link to="/menu">Browse Menu</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-3" data-ocid="orders.list">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
            >
              <Link
                to="/orders/$id"
                params={{ id: String(order.id) }}
                className="group flex items-center justify-between bg-card rounded-2xl shadow-toy hover:shadow-toy-hover transition-smooth p-5 border border-border/60"
                data-ocid={`orders.item.${idx + 1}`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-semibold text-foreground">
                      Order #{order.id}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                    <span>
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span className="text-primary font-medium">
                      {formatPrice(order.totalInCents)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>{formatOrderDate(order.createdAt)}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-3 group-hover:text-primary transition-smooth" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
