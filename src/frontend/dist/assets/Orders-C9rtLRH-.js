import { c as createLucideIcon, k as useAuth, l as useNavigate, r as reactExports, j as jsxRuntimeExports, n as Skeleton, m as motion, a as Button, L as Link, f as formatPrice, B as Badge, O as ORDER_STATUS_LABELS } from "./index-YPr-t_r6.js";
import { u as useOrders } from "./useOrders-BhlgYUsg.js";
import { C as ChevronRight } from "./chevron-right-B600Nthi.js";
import "./backend.d-D8GxpAUG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
const STATUS_BADGE = {
  placed: {
    bg: "bg-accent/20 text-accent-foreground",
    dot: "bg-accent",
    text: "Order Placed"
  },
  preparing: {
    bg: "bg-secondary/60 text-secondary-foreground",
    dot: "bg-secondary-foreground",
    text: "Preparing"
  },
  ready: {
    bg: "bg-primary/15 text-primary",
    dot: "bg-primary",
    text: "Ready for Pickup"
  },
  pickedUp: {
    bg: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    text: "Picked Up"
  }
};
function StatusBadge({ status }) {
  const s = STATUS_BADGE[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      className: `${s.bg} border-0 rounded-full flex items-center gap-1.5 px-3 py-1`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${s.dot} flex-shrink-0` }),
        ORDER_STATUS_LABELS[status]
      ]
    }
  );
}
function formatOrderDate(ns) {
  const ms = Number(ns) > 1e15 ? Number(ns) / 1e6 : Number(ns);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Orders() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { orders, isLoading } = useOrders();
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, authLoading, navigate]);
  if (isLoading || authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-2xl mx-auto px-4 py-10 space-y-4",
        "data-ocid": "orders.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-44" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-28 mb-2" }),
          [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }, i))
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container max-w-2xl mx-auto px-4 py-10",
      "data-ocid": "orders.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-1", children: "My Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: orders.length > 0 ? `${orders.length} order${orders.length !== 1 ? "s" : ""} total` : "Your order history lives here" })
            ]
          }
        ),
        orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.96 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4 },
            className: "flex flex-col items-center justify-center py-24 gap-5 text-center",
            "data-ocid": "orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-3xl bg-muted flex items-center justify-center shadow-toy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-12 h-12 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold", children: "No orders yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-xs", children: "Once you place your first order, you'll be able to track it right here." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "bg-primary text-primary-foreground rounded-2xl px-8 shadow-toy hover:shadow-toy-hover transition-smooth",
                  "data-ocid": "orders.browse_menu_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", children: "Browse Menu" })
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders.list", children: orders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: idx * 0.06 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/orders/$id",
                params: { id: String(order.id) },
                className: "group flex items-center justify-between bg-card rounded-2xl shadow-toy hover:shadow-toy-hover transition-smooth p-5 border border-border/60",
                "data-ocid": `orders.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                        "Order #",
                        order.id
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        order.items.length,
                        " ",
                        order.items.length === 1 ? "item" : "items"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-muted-foreground/50" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: formatPrice(order.totalInCents) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-muted-foreground/50" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatOrderDate(order.createdAt) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0 ml-3 group-hover:text-primary transition-smooth" })
                ]
              }
            )
          },
          order.id
        )) })
      ]
    }
  );
}
export {
  Orders as default
};
