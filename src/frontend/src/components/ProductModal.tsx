import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";
import { CATEGORY_LABELS, formatPrice } from "@/types";
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

type Size = "S" | "M" | "L";

const SIZE_LABELS: Record<Size, string> = {
  S: "Short (8 oz)",
  M: "Tall (12 oz)",
  L: "Grande (16 oz)",
};

const SIZE_UPCHARGE: Record<Size, number> = {
  S: -50,
  M: 0,
  L: 75,
};

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [size, setSize] = useState<Size>("M");
  const [qty, setQty] = useState(1);
  const [showNutrition, setShowNutrition] = useState(false);
  const { addToCart, openCart } = useCart();

  if (!product) return null;

  const finalPrice = product.priceInCents + SIZE_UPCHARGE[size];

  const handleAddToCart = () => {
    addToCart(product, qty);
    openCart();
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden rounded-3xl gap-0"
        data-ocid="product.dialog"
      >
        {/* 2:3 hero image */}
        <div className="aspect-[2/3] max-h-[300px] overflow-hidden relative bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <Badge className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-foreground border-0 font-semibold rounded-full px-3 py-1">
            {CATEGORY_LABELS[product.category]}
          </Badge>
        </div>

        <div className="p-5 space-y-4">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="font-display text-xl font-bold text-foreground">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </DialogDescription>
          </DialogHeader>

          {/* Size selector */}
          <div data-ocid="product.size_selector">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Size
            </p>
            <div className="flex gap-2">
              {(["S", "M", "L"] as Size[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-smooth border-2 ${
                    size === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                  data-ocid={`product.size_${s.toLowerCase()}_button`}
                >
                  <span className="block">{s}</span>
                  <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                    {SIZE_LABELS[s]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Nutrition toggle */}
          <button
            type="button"
            className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowNutrition((v) => !v)}
            data-ocid="product.nutrition_toggle"
          >
            <span>Nutritional Info</span>
            {showNutrition ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showNutrition && (
            <div
              className="grid grid-cols-4 gap-2 bg-muted/60 rounded-2xl p-3"
              data-ocid="product.nutrition_panel"
            >
              {(
                [
                  ["Calories", product.nutritionalInfo.calories, "kcal"],
                  ["Fat", product.nutritionalInfo.fat, "g"],
                  ["Carbs", product.nutritionalInfo.carbs, "g"],
                  ["Protein", product.nutritionalInfo.protein, "g"],
                ] as [string, number, string][]
              ).map(([label, value, unit]) => (
                <div key={label} className="text-center">
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                  <p className="font-bold text-sm text-foreground">
                    {value}
                    <span className="text-[10px] font-normal ml-0.5">
                      {unit}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Qty + Add to Cart */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-1 py-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                data-ocid="product.qty_minus_button"
              >
                <Minus className="w-3.5 h-3.5" />
              </Button>
              <span
                className="w-6 text-center font-bold text-sm"
                data-ocid="product.qty_display"
              >
                {qty}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => setQty((q) => q + 1)}
                data-ocid="product.qty_plus_button"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>

            <Button
              type="button"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl py-6 font-semibold shadow-toy text-sm gap-2"
              onClick={handleAddToCart}
              disabled={!product.available}
              data-ocid="product.add_to_cart_button"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Order · {formatPrice(finalPrice * qty)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
