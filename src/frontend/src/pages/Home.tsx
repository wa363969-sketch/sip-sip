import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { Category, Product } from "@/types";
import { CATEGORY_LABELS, formatPrice } from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Leaf, ShoppingCart, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "iced-caramel-macchiato",
    name: "Iced Caramel Macchiato",
    description:
      "Freshly steamed milk with vanilla-flavored syrup and bold espresso poured over ice",
    imageUrl:
      "/assets/generated/product-iced-caramel-macchiato.dim_400x600.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 250, fat: 7, carbs: 38, protein: 10 },
    available: true,
  },
  {
    id: "pink-drink",
    name: "Pink Drink",
    description:
      "Starbucks Refresher with coconut milk and acai and passion fruit flavors",
    imageUrl: "/assets/generated/product-pink-drink.dim_400x600.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 140, fat: 2.5, carbs: 27, protein: 1 },
    available: true,
  },
  {
    id: "cinnamon-roll",
    name: "Classic Cinnamon Roll",
    description: "Soft, fluffy cinnamon roll with vanilla cream cheese icing",
    imageUrl: "/assets/generated/product-cinnamon-roll.dim_400x600.png",
    priceInCents: 395,
    category: "food",
    nutritionalInfo: { calories: 420, fat: 14, carbs: 67, protein: 7 },
    available: true,
  },
  {
    id: "matcha-frappuccino",
    name: "Matcha Crème Frappuccino",
    description:
      "Sweet matcha green tea blended with milk and ice, topped with whipped cream",
    imageUrl: "/assets/generated/product-matcha-frappuccino.dim_400x600.png",
    priceInCents: 645,
    category: "frappuccinos",
    nutritionalInfo: { calories: 420, fat: 15, carbs: 66, protein: 5 },
    available: true,
  },
];

const CATEGORY_ITEMS: { category: Category; emoji: string; desc: string }[] = [
  { category: "hotDrinks", emoji: "☕", desc: "Lattes, Americanos & more" },
  { category: "coldDrinks", emoji: "🧋", desc: "Refreshers & Iced teas" },
  { category: "frappuccinos", emoji: "🥤", desc: "Blended frozen drinks" },
  { category: "food", emoji: "🧁", desc: "Pastries & snacks" },
];

// ─── CSS 3D Miniature Store Component ────────────────────────────────────────

function MiniatureStore({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      className="relative select-none cursor-pointer group w-full text-left bg-transparent border-0 p-0"
      style={{ perspective: "900px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-ocid="home.miniature_store"
      aria-label="Enter the Starbucks miniature store"
    >
      {/* Scene wrapper with isometric tilt */}
      <div
        className="relative w-full max-w-sm mx-auto transition-smooth"
        style={{
          transform: isHovered
            ? "rotateX(5deg) scale(1.02)"
            : "rotateX(2deg) scale(1)",
          transformOrigin: "center bottom",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Ground platform — warm wood base */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] opacity-60"
          style={{
            width: "110%",
            height: "32px",
            background: "oklch(0.78 0.06 54)",
            boxShadow: "0 12px 40px -4px rgba(0,60,30,0.35)",
            filter: "blur(2px)",
          }}
        />

        {/* Main store image — 2:3 aspect */}
        <div className="relative aspect-[2/3] w-full rounded-3xl overflow-hidden shadow-toy">
          <img
            src="/assets/generated/starbucks-miniature-store.dim_600x900.png"
            alt="Starbucks Little Wonders miniature store"
            className="w-full h-full object-cover transition-smooth"
            style={{ transform: isHovered ? "scale(1.04)" : "scale(1)" }}
          />

          {/* Glass dome sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%, rgba(0,0,0,0.04) 100%)",
            }}
          />

          {/* Warm interior glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-smooth"
            style={{
              background: isHovered
                ? "radial-gradient(ellipse at 50% 60%, rgba(255,200,80,0.15) 0%, transparent 70%)"
                : "radial-gradient(ellipse at 50% 60%, rgba(255,200,80,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Click-to-enter overlay on hover */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-6 transition-smooth"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl font-semibold text-sm shadow-float"
              style={{
                transform: isHovered ? "translateY(0)" : "translateY(8px)",
                transition: "transform 0.3s ease",
              }}
            >
              <ChevronRight className="w-4 h-4" />
              Enter the Store
            </div>
          </div>
        </div>

        {/* Floating blind-box badge */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -bottom-4 -right-4 z-10"
        >
          <div className="bg-accent text-accent-foreground px-4 py-2 rounded-2xl shadow-float font-semibold text-sm">
            🎁 Blind-Box Surprise!
          </div>
        </motion.div>

        {/* Floating sparkle top-left */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute -top-3 -left-3 z-10"
        >
          <div className="bg-primary text-primary-foreground w-9 h-9 rounded-xl flex items-center justify-center shadow-float">
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { addToCart } = useCart();

  function handleStoreClick() {
    window.location.href = "/menu";
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section
        className="relative bg-card overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Background decorative circles */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.38 0.15 142 / 0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 -left-16 w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.65 0.22 54 / 0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <Badge className="mb-4 bg-accent/20 text-accent-foreground border-0 rounded-full px-3 py-1">
                <Leaf className="w-3 h-3 mr-1" /> Blind-Box Collection 2026
              </Badge>
              <h1 className="font-display text-4xl lg:text-6xl font-bold leading-tight text-foreground">
                Welcome to <span className="text-primary">Little Wonders!</span>
              </h1>
              <p className="mt-4 text-muted-foreground text-lg max-w-md">
                Order your favorite Starbucks drinks and collect adorable
                miniature chibi toy figures with every purchase.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl shadow-float font-semibold px-8"
                  data-ocid="home.order_now_button"
                >
                  <Link to="/menu">Order Now</Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="rounded-2xl border-2 border-primary/30 font-semibold px-8"
                  onClick={() =>
                    document
                      .getElementById("featured")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-ocid="home.explore_button"
                >
                  Explore Menu
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-10 flex items-center gap-6">
                <div className="text-center">
                  <p className="font-display font-bold text-2xl text-primary">
                    50+
                  </p>
                  <p className="text-xs text-muted-foreground">Menu Items</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="font-display font-bold text-2xl text-primary">
                    12
                  </p>
                  <p className="text-xs text-muted-foreground">Toy Figures</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="font-display font-bold text-2xl text-primary">
                    5★
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </motion.div>

            {/* Right: CSS 3D miniature store */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="w-full max-w-[320px] lg:max-w-[360px]">
                <MiniatureStore onClick={handleStoreClick} />
                <p className="text-center text-xs text-muted-foreground mt-6 font-medium">
                  ✨ Click the store to enter
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category quick nav */}
      <section
        className="bg-muted/30 py-12"
        data-ocid="home.categories_section"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORY_ITEMS.map(({ category, emoji, desc }, idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to="/menu/$category"
                  params={{ category }}
                  className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-toy hover:shadow-toy-hover transition-smooth text-center group block"
                  data-ocid={`home.category_${category}_link`}
                >
                  <span className="text-4xl group-hover:animate-float inline-block">
                    {emoji}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {CATEGORY_LABELS[category]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section
        id="featured"
        className="py-12 bg-background"
        data-ocid="home.featured_section"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Customer Favorites
            </h2>
            <Link
              to="/menu"
              className="text-primary text-sm font-semibold hover:underline flex items-center gap-1"
              data-ocid="home.view_all_link"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-card rounded-2xl overflow-hidden shadow-toy hover:shadow-toy-hover transition-smooth group"
                data-ocid={`home.product_card.${idx + 1}`}
              >
                <div className="aspect-[2/3] overflow-hidden relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary/90 text-primary-foreground text-xs border-0 rounded-full">
                      {CATEGORY_LABELS[product.category]}
                    </Badge>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-bold">
                      {formatPrice(product.priceInCents)}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                      onClick={() => addToCart(product)}
                      data-ocid={`home.add_to_cart_button.${idx + 1}`}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blind-box collection banner */}
      <section
        className="bg-primary py-16 overflow-hidden"
        data-ocid="home.collection_banner"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
                <Star className="w-3 h-3 mr-1 fill-current" /> Limited Edition
              </Badge>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground">
                Your Next Favorite Surprise
              </h2>
              <p className="mt-3 text-primary-foreground/80 text-lg">
                Collect all 12 chibi Starbucks characters. Each order includes a
                mystery blind-box toy figure!
              </p>
              <div className="flex gap-3 mt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl font-semibold shadow-float"
                  data-ocid="home.collect_now_button"
                >
                  <Link to="/menu">Collect Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 rounded-2xl font-semibold"
                  data-ocid="home.discover_toys_button"
                >
                  <Link to="/menu">Discover Toys</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-xs">
                <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/generated/starbucks-chibi-figures.dim_600x900.png"
                    alt="Chibi Starbucks collectible figures"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating mini badge */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4"
                >
                  <div className="bg-accent text-accent-foreground px-3 py-1.5 rounded-xl shadow-float font-bold text-sm">
                    🎲 12 to collect!
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
