import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
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
      closeCart();
      window.location.href = url;
    } catch (_err) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-4 border-b bg-card">
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Order
            {totalItems > 0 && (
              <span className="ml-auto text-sm font-body font-normal text-muted-foreground">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8"
            data-ocid="cart.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Add your favorite Starbucks drinks and food
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={closeCart}
              data-ocid="cart.close_button"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <AnimatePresence initial={false}>
                {items.map((item, idx) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 py-4 border-b last:border-0"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {item.product.name}
                      </p>
                      <p className="text-primary text-sm font-medium">
                        {formatPrice(item.product.priceInCents)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        data-ocid={`cart.minus_button.${idx + 1}`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
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
                        className="h-7 w-7 text-destructive hover:text-destructive ml-1"
                        onClick={() => removeFromCart(item.product.id)}
                        data-ocid={`cart.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className="px-6 py-4 bg-card border-t space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(totalInCents)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(totalInCents)}
                </span>
              </div>
              <Button
                type="button"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-base rounded-2xl shadow-float"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                data-ocid="cart.submit_button"
              >
                {isCheckingOut
                  ? "Redirecting…"
                  : `Checkout · ${formatPrice(totalInCents)}`}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={closeCart}
                data-ocid="cart.cancel_button"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
