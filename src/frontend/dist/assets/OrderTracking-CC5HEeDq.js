import { c as createLucideIcon, k as useAuth, l as useNavigate, d as useParams, o as useQueryClient, r as reactExports, j as jsxRuntimeExports, n as Skeleton, a as Button, L as Link, m as motion, B as Badge, O as ORDER_STATUS_LABELS, f as formatPrice } from "./index-YPr-t_r6.js";
import { O as OrderStatus } from "./backend.d-D8GxpAUG.js";
import { u as useOrders } from "./useOrders-BhlgYUsg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const STEPS = [
  OrderStatus.placed,
  OrderStatus.preparing,
  OrderStatus.ready,
  OrderStatus.pickedUp
];
const STATUS_BADGE = {
  placed: "bg-accent/20 text-accent-foreground border-0",
  preparing: "bg-secondary/60 text-secondary-foreground border-0",
  ready: "bg-primary/15 text-primary border-0",
  pickedUp: "bg-muted text-muted-foreground border-0"
};
const STEP_DESCRIPTIONS = {
  placed: "We've received your order and are getting ready.",
  preparing: "Our baristas are crafting your drinks right now.",
  ready: "Your order is ready! Head to the counter to pick it up.",
  pickedUp: "Order complete. Enjoy your drinks!"
};
function formatOrderDate(ns) {
  const ms = Number(ns) > 1e15 ? Number(ns) / 1e6 : Number(ns);
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function OrderTracking() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const id = params.id;
  const { orders, isLoading } = useOrders();
  const queryClient = useQueryClient();
  const order = orders.find((o) => String(o.id) === id);
  const isActive = order ? order.status !== "pickedUp" : false;
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, authLoading, navigate]);
  reactExports.useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    }, 5e3);
    return () => clearInterval(interval);
  }, [isActive, queryClient]);
  if (isLoading || authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-2xl mx-auto px-4 py-10 space-y-4",
        "data-ocid": "order_tracking.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl" })
        ]
      }
    );
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4",
        "data-ocid": "order_tracking.not_found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-muted flex items-center justify-center shadow-toy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold", children: "Order not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-xs", children: "This order doesn't exist or may have been removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "rounded-2xl",
              "data-ocid": "order_tracking.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                "Back to Orders"
              ] })
            }
          )
        ]
      }
    );
  }
  const currentStep = STEPS.indexOf(order.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container max-w-2xl mx-auto px-4 py-10",
      "data-ocid": "order_tracking.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            className: "mb-6 -ml-2 text-muted-foreground hover:text-foreground transition-smooth",
            "data-ocid": "order_tracking.back_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
              "My Orders"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "bg-card rounded-3xl shadow-toy border border-border/60 p-6 mb-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold", children: [
                    "Order #",
                    order.id
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatOrderDate(order.createdAt) }),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "~",
                      order.estimatedPickupMinutes,
                      " min estimated"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 ml-1 text-xs text-primary", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
                      "Live"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `${STATUS_BADGE[order.status]} rounded-full px-3 py-1 text-sm flex-shrink-0`,
                    children: ORDER_STATUS_LABELS[order.status]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "order_tracking.progress", className: "mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: STEPS.map((step, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrentStep = idx === currentStep;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: isCurrentStep ? { scale: 0.8 } : false,
                        animate: isCurrentStep ? { scale: [0.85, 1.05, 1] } : {},
                        transition: { duration: 0.5, ease: "easeOut" },
                        className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-smooth
                        ${isDone ? "bg-primary text-primary-foreground shadow-md" : isCurrentStep ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-toy" : "bg-muted text-muted-foreground"}
                      `,
                        children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : isCurrentStep ? isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: idx + 1 })
                      }
                    ) }),
                    idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1 flex-1 mx-1.5 rounded-full overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "absolute inset-y-0 left-0 bg-primary rounded-full",
                        initial: { width: 0 },
                        animate: { width: idx < currentStep ? "100%" : "0%" },
                        transition: {
                          duration: 0.6,
                          delay: idx * 0.15,
                          ease: "easeOut"
                        }
                      }
                    ) })
                  ] }, step);
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex mt-2", children: STEPS.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-medium transition-smooth ${idx <= currentStep ? "text-foreground" : "text-muted-foreground"}`,
                    children: ORDER_STATUS_LABELS[step]
                  }
                ) }, step)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.3 },
                  className: "mt-4 rounded-2xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground",
                  children: STEP_DESCRIPTIONS[order.status]
                },
                order.status
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "bg-card rounded-2xl shadow-toy border border-border/60 p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-4 text-base", children: "Order Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-sm",
                  "data-ocid": `order_tracking.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0", children: item.quantity }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground", children: item.productName })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium ml-3 flex-shrink-0", children: formatPrice(Number(item.priceInCents) * Number(item.quantity)) })
                  ]
                },
                `${item.productId}-${idx}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border mt-4 pt-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-lg", children: formatPrice(order.totalInCents) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  OrderTracking as default
};
