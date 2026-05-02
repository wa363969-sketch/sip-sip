import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalInCents,
    totalItems,
    clearCart,
  } = useCart();
  const { actor } = useActor(createActor);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function handleCheckout() {
    if (!actor) {
      toast.error("Not connected to backend");
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
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
        data-ocid="cart.empty_state"
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mt-2">
            Add some Starbucks favorites to get started
          </p>
        </div>
        <Button
          asChild
          className="bg-primary text-primary-foreground rounded-2xl px-8"
          data-ocid="cart.browse_menu_button"
        >
          <Link to="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className="container max-w-2xl mx-auto px-4 py-8"
      data-ocid="cart.page"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">
          Your Cart
          <span className="ml-2 text-lg text-muted-foreground font-body font-normal">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </h1>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={clearCart}
          data-ocid="cart.clear_button"
        >
          Clear all
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-toy overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 px-5 py-4 border-b last:border-0"
            data-ocid={`cart.item.${idx + 1}`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{item.product.name}</p>
              <p className="text-primary font-medium text-sm">
                {formatPrice(item.product.priceInCents)}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                data-ocid={`cart.minus_button.${idx + 1}`}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-6 text-center font-semibold">
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                data-ocid={`cart.plus_button.${idx + 1}`}
              >
                <Plus className="w-3 h-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => removeFromCart(item.product.id)}
                data-ocid={`cart.delete_button.${idx + 1}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-card rounded-2xl shadow-toy p-5 space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatPrice(totalInCents)}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Service fee</span>
          <span>Free</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">{formatPrice(totalInCents)}</span>
        </div>
        <Button
          type="button"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl py-6 text-base font-semibold shadow-float mt-2"
          onClick={handleCheckout}
          disabled={isCheckingOut}
          data-ocid="cart.checkout_button"
        >
          {isCheckingOut
            ? "Redirecting…"
            : `Checkout · ${formatPrice(totalInCents)}`}
        </Button>
      </div>
    </div>
  );
}
