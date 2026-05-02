import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category, Product } from "@/types";
import { CATEGORY_LABELS } from "@/types";
import { useParams } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

const ALL_PRODUCTS: Product[] = [
  {
    id: "classic-latte",
    name: "Classic Latte",
    description: "Espresso with steamed milk and a light layer of foam",
    imageUrl: "/assets/generated/product-classic-latte.dim_600x900.png",
    priceInCents: 545,
    category: "hotDrinks",
    nutritionalInfo: { calories: 190, fat: 7, carbs: 24, protein: 10 },
    available: true,
  },
  {
    id: "pumpkin-spice-latte",
    name: "Pumpkin Spice Latte",
    description:
      "Espresso and pumpkin-flavored sauce, milk, fall spices and whipped cream",
    imageUrl: "/assets/generated/product-classic-latte.dim_600x900.png",
    priceInCents: 595,
    category: "hotDrinks",
    nutritionalInfo: { calories: 380, fat: 14, carbs: 52, protein: 14 },
    available: true,
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Ristretto shots of espresso with whole milk microfoam",
    imageUrl: "/assets/generated/product-classic-latte.dim_600x900.png",
    priceInCents: 525,
    category: "hotDrinks",
    nutritionalInfo: { calories: 170, fat: 9, carbs: 15, protein: 9 },
    available: true,
  },
  {
    id: "iced-caramel-macchiato",
    name: "Iced Caramel Macchiato",
    description:
      "Freshly steamed milk with vanilla-flavored syrup and bold espresso poured over ice",
    imageUrl:
      "/assets/generated/product-iced-caramel-macchiato.dim_600x900.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 250, fat: 7, carbs: 38, protein: 10 },
    available: true,
  },
  {
    id: "pink-drink",
    name: "Pink Drink",
    description:
      "Starbucks Refresher with coconut milk, acai and passion fruit flavors",
    imageUrl: "/assets/generated/product-pink-drink.dim_600x900.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 140, fat: 2.5, carbs: 27, protein: 1 },
    available: true,
  },
  {
    id: "cold-brew",
    name: "Cold Brew Coffee",
    description: "Slow-steeped cold brew coffee, ready to drink over ice",
    imageUrl:
      "/assets/generated/product-iced-caramel-macchiato.dim_600x900.png",
    priceInCents: 545,
    category: "coldDrinks",
    nutritionalInfo: { calories: 5, fat: 0, carbs: 0, protein: 1 },
    available: true,
  },
  {
    id: "matcha-frappuccino",
    name: "Matcha Cr\u00e8me Frappuccino",
    description:
      "Sweet matcha green tea blended with milk and ice, topped with whipped cream",
    imageUrl: "/assets/generated/product-matcha-frappuccino.dim_600x900.png",
    priceInCents: 645,
    category: "frappuccinos",
    nutritionalInfo: { calories: 420, fat: 15, carbs: 66, protein: 5 },
    available: true,
  },
  {
    id: "caramel-frappuccino",
    name: "Caramel Frappuccino",
    description:
      "Coffee blended with milk, ice and caramel sauce with whipped cream",
    imageUrl: "/assets/generated/product-caramel-frappuccino.dim_600x900.png",
    priceInCents: 625,
    category: "frappuccinos",
    nutritionalInfo: { calories: 410, fat: 15, carbs: 66, protein: 4 },
    available: true,
  },
  {
    id: "java-chip-frappuccino",
    name: "Java Chip Frappuccino",
    description:
      "Frappuccino roast with mocha sauce, chips, milk and whipped cream",
    imageUrl: "/assets/generated/product-caramel-frappuccino.dim_600x900.png",
    priceInCents: 655,
    category: "frappuccinos",
    nutritionalInfo: { calories: 470, fat: 18, carbs: 72, protein: 6 },
    available: true,
  },
  {
    id: "cinnamon-roll",
    name: "Classic Cinnamon Roll",
    description: "Soft, fluffy cinnamon roll with vanilla cream cheese icing",
    imageUrl: "/assets/generated/product-food-items.dim_600x900.png",
    priceInCents: 395,
    category: "food",
    nutritionalInfo: { calories: 420, fat: 14, carbs: 67, protein: 7 },
    available: true,
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description: "Flaky, buttery croissant baked fresh daily",
    imageUrl: "/assets/generated/product-food-items.dim_600x900.png",
    priceInCents: 350,
    category: "food",
    nutritionalInfo: { calories: 240, fat: 12, carbs: 30, protein: 5 },
    available: true,
  },
  {
    id: "chocolate-cake-pop",
    name: "Chocolate Cake Pop",
    description: "Moist chocolate cake dipped in a rich chocolatey coating",
    imageUrl: "/assets/generated/product-food-items.dim_600x900.png",
    priceInCents: 295,
    category: "food",
    nutritionalInfo: { calories: 170, fat: 8, carbs: 24, protein: 2 },
    available: true,
  },
];

const CATEGORIES: Category[] = [
  "hotDrinks",
  "coldDrinks",
  "frappuccinos",
  "food",
];

export default function Menu() {
  const params = useParams({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const urlCategory = params.category;
  const [activeCategory, setActiveCategory] = useState<Category | "all">(
    (urlCategory as Category) || "all",
  );
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen" data-ocid="menu.page">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
              Little Wonders
            </p>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Our Menu
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {ALL_PRODUCTS.length} handcrafted items, ready to order
            </p>
          </div>
          <div className="sm:ml-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search menu\u2026"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-2xl border-border w-full sm:w-64 bg-card"
              data-ocid="menu.search_input"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-green"
          data-ocid="menu.category_tabs"
        >
          <Button
            type="button"
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            className={`rounded-full flex-shrink-0 font-semibold text-xs px-4 ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setActiveCategory("all")}
            data-ocid="menu.all_tab"
          >
            All
          </Button>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              type="button"
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              className={`rounded-full flex-shrink-0 font-semibold text-xs px-4 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setActiveCategory(cat)}
              data-ocid={`menu.${cat}_tab`}
            >
              {CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>

        {/* Count indicator */}
        {search && (
          <p className="text-xs text-muted-foreground mb-4">
            {filtered.length === 0
              ? "No results"
              : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for \u201c${search}\u201d`}
          </p>
        )}

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            data-ocid="menu.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-display text-xl font-semibold">Nothing found</p>
            <p className="text-muted-foreground text-sm">
              Try a different category or search term
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full mt-1"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product detail modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
