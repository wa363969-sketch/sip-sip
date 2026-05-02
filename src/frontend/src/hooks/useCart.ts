import { useCartContext } from "@/contexts/CartContext";
import type { Product } from "@/types";

export function useCart() {
  const ctx = useCartContext();

  const addToCart = (product: Product, quantity = 1) => {
    if (!product.available) return;
    ctx.addItem(product, quantity);
  };

  return {
    items: ctx.items,
    totalItems: ctx.totalItems,
    totalInCents: ctx.totalInCents,
    isOpen: ctx.isOpen,
    addToCart,
    removeFromCart: ctx.removeItem,
    updateQuantity: ctx.updateQuantity,
    clearCart: ctx.clearCart,
    openCart: ctx.openCart,
    closeCart: ctx.closeCart,
    toggleCart: ctx.toggleCart,
  };
}
