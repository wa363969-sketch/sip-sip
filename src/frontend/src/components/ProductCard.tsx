import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";
import { CATEGORY_LABELS, formatPrice } from "@/types";
import { Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, index, onClick }: ProductCardProps) {
  const { addToCart, items, openCart } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    if (qty === 0) openCart();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      onClick={() => onClick(product)}
      className="bg-card rounded-3xl overflow-hidden shadow-toy hover:shadow-toy-hover transition-smooth group cursor-pointer relative"
      data-ocid={`menu.product_card.${index + 1}`}
    >
      {/* 2:3 image area */}
      <div className="aspect-[2/3] overflow-hidden relative bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          loading="lazy"
        />
        {/* category badge */}
        <Badge className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground border-0 text-[10px] font-semibold shadow-sm rounded-full px-2.5 py-0.5">
          {CATEGORY_LABELS[product.category]}
        </Badge>
        {/* qty badge */}
        {qty > 0 && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
            {qty}
          </div>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="bg-card px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* info section */}
      <div className="p-3.5">
        <p className="font-display font-bold text-sm text-foreground line-clamp-1 leading-snug">
          {product.name}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3 gap-2">
          <span className="text-primary font-bold text-sm">
            {formatPrice(product.priceInCents)}
          </span>
          <Button
            type="button"
            size="sm"
            disabled={!product.available}
            className="h-8 w-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 p-0 shadow-sm flex-shrink-0 disabled:opacity-40"
            onClick={handleAddToCart}
            aria-label={
              qty > 0
                ? `Add another ${product.name}`
                : `Add ${product.name} to cart`
            }
            data-ocid={`menu.add_to_cart_button.${index + 1}`}
          >
            {qty > 0 ? (
              <Plus className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
