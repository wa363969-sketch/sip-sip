import { u as useCart, e as useActor, r as reactExports, j as jsxRuntimeExports, g as ShoppingBag, a as Button, L as Link, f as formatPrice, M as Minus, P as Plus, T as Trash2, b as Separator, h as ue, i as createActor } from "./index-YPr-t_r6.js";
function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalInCents,
    totalItems,
    clearCart
  } = useCart();
  const { actor } = useActor(createActor);
  const [isCheckingOut, setIsCheckingOut] = reactExports.useState(false);
  async function handleCheckout() {
    if (!actor) {
      ue.error("Not connected to backend");
      return;
    }
    setIsCheckingOut(true);
    try {
      const successUrl = `${window.location.origin}/order-success`;
      const cancelUrl = `${window.location.origin}/cart`;
      const url = await actor.checkout(successUrl, cancelUrl);
      clearCart();
      window.location.href = url;
    } catch (_err) {
      ue.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-12 h-12 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Your cart is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Add some Starbucks favorites to get started" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-primary text-primary-foreground rounded-2xl px-8",
              "data-ocid": "cart.browse_menu_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", children: "Browse Menu" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container max-w-2xl mx-auto px-4 py-8",
      "data-ocid": "cart.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold", children: [
            "Your Cart",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-lg text-muted-foreground font-body font-normal", children: [
              "(",
              totalItems,
              " ",
              totalItems === 1 ? "item" : "items",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground",
              onClick: clearCart,
              "data-ocid": "cart.clear_button",
              children: "Clear all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl shadow-toy overflow-hidden", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-4 px-5 py-4 border-b last:border-0",
            "data-ocid": `cart.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.product.imageUrl,
                  alt: item.product.name,
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold truncate", children: item.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-sm", children: formatPrice(item.product.priceInCents) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => updateQuantity(item.product.id, item.quantity - 1),
                    "data-ocid": `cart.minus_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-semibold", children: item.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => updateQuantity(item.product.id, item.quantity + 1),
                    "data-ocid": `cart.plus_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive",
                    onClick: () => removeFromCart(item.product.id),
                    "data-ocid": `cart.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ] })
            ]
          },
          item.product.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-card rounded-2xl shadow-toy p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(totalInCents) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Service fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Free" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(totalInCents) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl py-6 text-base font-semibold shadow-float mt-2",
              onClick: handleCheckout,
              disabled: isCheckingOut,
              "data-ocid": "cart.checkout_button",
              children: isCheckingOut ? "Redirecting…" : `Checkout · ${formatPrice(totalInCents)}`
            }
          )
        ] })
      ]
    }
  );
}
export {
  Cart as default
};
