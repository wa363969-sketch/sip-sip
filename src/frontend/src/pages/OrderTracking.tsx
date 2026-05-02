import { OrderStatus } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { ORDER_STATUS_LABELS, formatPrice } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, Clock, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const STEPS: OrderStatus[] = [
  OrderStatus.placed,
  OrderStatus.preparing,
  OrderStatus.ready,
  OrderStatus.pickedUp,
];

const _STEP_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  done: CheckCircle2,
  active: Loader2,
  pending: Circle,
};

const STATUS_BADGE: Record<OrderStatus, string> = {
  placed: "bg-accent/20 text-accent-foreground border-0",
  preparing: "bg-secondary/60 text-secondary-foreground border-0",
  ready: "bg-primary/15 text-primary border-0",
  pickedUp: "bg-muted text-muted-foreground border-0",
};

const STEP_DESCRIPTIONS: Record<OrderStatus, string> = {
  placed: "We've received your order and are getting ready.",
  preparing: "Our baristas are crafting your drinks right now.",
  ready: "Your order is ready! Head to the counter to pick it up.",
  pickedUp: "Order complete. Enjoy your drinks!",
};

function formatOrderDate(ns: number | bigint): string {
  const ms = Number(ns) > 1e15 ? Number(ns) / 1_000_000 : Number(ns);
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderTracking() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const id = params.id;
  const { orders, isLoading } = useOrders();
  const queryClient = useQueryClient();

  const order = orders.find((o) => String(o.id) === id);
  const isActive = order ? order.status !== "pickedUp" : false;

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Poll every 5 seconds while order is active
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    }, 5000);
    return () => clearInterval(interval);
  }, [isActive, queryClient]);

  if (isLoading || authLoading) {
    return (
      <div
        className="container max-w-2xl mx-auto px-4 py-10 space-y-4"
        data-ocid="order_tracking.loading_state"
      >
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full rounded-3xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4"
        data-ocid="order_tracking.not_found"
      >
        <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center shadow-toy">
          <Circle className="w-10 h-10 text-muted-foreground" />
        </div>
        <div>
          <p className="font-display text-2xl font-bold">Order not found</p>
          <p className="text-muted-foreground mt-1 text-sm max-w-xs">
            This order doesn't exist or may have been removed.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="rounded-2xl"
          data-ocid="order_tracking.back_button"
        >
          <Link to="/orders">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
      </div>
    );
  }

  const currentStep = STEPS.indexOf(order.status);

  return (
    <div
      className="container max-w-2xl mx-auto px-4 py-10"
      data-ocid="order_tracking.page"
    >
      {/* Back button */}
      <Button
        asChild
        variant="ghost"
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground transition-smooth"
        data-ocid="order_tracking.back_button"
      >
        <Link to="/orders">
          <ArrowLeft className="w-4 h-4 mr-2" />
          My Orders
        </Link>
      </Button>

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-3xl shadow-toy border border-border/60 p-6 mb-5"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold">
              Order #{order.id}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatOrderDate(order.createdAt)}
            </p>
            {isActive && (
              <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>~{order.estimatedPickupMinutes} min estimated</span>
                <span className="inline-flex items-center gap-1 ml-1 text-xs text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Live
                </span>
              </div>
            )}
          </div>
          <Badge
            className={`${STATUS_BADGE[order.status]} rounded-full px-3 py-1 text-sm flex-shrink-0`}
          >
            {ORDER_STATUS_LABELS[order.status]}
          </Badge>
        </div>

        {/* Status Timeline Stepper */}
        <div data-ocid="order_tracking.progress" className="mb-2">
          <div className="flex items-center">
            {STEPS.map((step, idx) => {
              const isDone = idx < currentStep;
              const isCurrentStep = idx === currentStep;
              const _isPending = idx > currentStep;
              return (
                <div key={step} className="flex items-center flex-1">
                  {/* Step circle */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      initial={isCurrentStep ? { scale: 0.8 } : false}
                      animate={isCurrentStep ? { scale: [0.85, 1.05, 1] } : {}}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-smooth
                        ${
                          isDone
                            ? "bg-primary text-primary-foreground shadow-md"
                            : isCurrentStep
                              ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-toy"
                              : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isCurrentStep ? (
                        isActive ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )
                      ) : (
                        <span className="text-xs">{idx + 1}</span>
                      )}
                    </motion.div>
                  </div>
                  {/* Connector line */}
                  {idx < STEPS.length - 1 && (
                    <div className="relative h-1 flex-1 mx-1.5 rounded-full overflow-hidden bg-muted">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: idx < currentStep ? "100%" : "0%" }}
                        transition={{
                          duration: 0.6,
                          delay: idx * 0.15,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Step labels */}
          <div className="flex mt-2">
            {STEPS.map((step, idx) => (
              <div key={step} className="flex-1 text-center">
                <span
                  className={`text-xs font-medium transition-smooth ${
                    idx <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {ORDER_STATUS_LABELS[step]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current step description */}
        <motion.div
          key={order.status}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-2xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground"
        >
          {STEP_DESCRIPTIONS[order.status]}
        </motion.div>
      </motion.div>

      {/* Order items card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-card rounded-2xl shadow-toy border border-border/60 p-5"
      >
        <h2 className="font-semibold mb-4 text-base">Order Details</h2>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={`${item.productId}-${idx}`}
              className="flex items-center justify-between text-sm"
              data-ocid={`order_tracking.item.${idx + 1}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {item.quantity}
                </span>
                <span className="truncate text-foreground">
                  {item.productName}
                </span>
              </div>
              <span className="text-primary font-medium ml-3 flex-shrink-0">
                {formatPrice(Number(item.priceInCents) * Number(item.quantity))}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-primary font-bold text-lg">
            {formatPrice(order.totalInCents)}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
