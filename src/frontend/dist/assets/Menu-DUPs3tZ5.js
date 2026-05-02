import { c as createLucideIcon, u as useCart, j as jsxRuntimeExports, m as motion, B as Badge, C as CATEGORY_LABELS, f as formatPrice, a as Button, P as Plus, S as ShoppingCart, r as reactExports, b as Separator, M as Minus, d as useParams } from "./index-YPr-t_r6.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, C as ChevronUp, e as ChevronDown, I as Input } from "./input-Bb72RLQx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function ProductCard({ product, index, onClick }) {
  const { addToCart, items, openCart } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = (cartItem == null ? void 0 : cartItem.quantity) ?? 0;
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    if (qty === 0) openCart();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.04, duration: 0.35 },
      onClick: () => onClick(product),
      className: "bg-card rounded-3xl overflow-hidden shadow-toy hover:shadow-toy-hover transition-smooth group cursor-pointer relative",
      "data-ocid": `menu.product_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[2/3] overflow-hidden relative bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground border-0 text-[10px] font-semibold shadow-sm rounded-full px-2.5 py-0.5", children: CATEGORY_LABELS[product.category] }),
          qty > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md", children: qty }),
          !product.available && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground", children: "Unavailable" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground line-clamp-1 leading-snug", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-sm", children: formatPrice(product.priceInCents) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                disabled: !product.available,
                className: "h-8 w-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 p-0 shadow-sm flex-shrink-0 disabled:opacity-40",
                onClick: handleAddToCart,
                "aria-label": qty > 0 ? `Add another ${product.name}` : `Add ${product.name} to cart`,
                "data-ocid": `menu.add_to_cart_button.${index + 1}`,
                children: qty > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const SIZE_LABELS = {
  S: "Short (8 oz)",
  M: "Tall (12 oz)",
  L: "Grande (16 oz)"
};
const SIZE_UPCHARGE = {
  S: -50,
  M: 0,
  L: 75
};
function ProductModal({ product, onClose }) {
  const [size, setSize] = reactExports.useState("M");
  const [qty, setQty] = reactExports.useState(1);
  const [showNutrition, setShowNutrition] = reactExports.useState(false);
  const { addToCart, openCart } = useCart();
  if (!product) return null;
  const finalPrice = product.priceInCents + SIZE_UPCHARGE[size];
  const handleAddToCart = () => {
    addToCart(product, qty);
    openCart();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!product, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-md p-0 overflow-hidden rounded-3xl gap-0",
      "data-ocid": "product.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[2/3] max-h-[300px] overflow-hidden relative bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-foreground border-0 font-semibold rounded-full px-3 py-1", children: CATEGORY_LABELS[product.category] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "space-y-1 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl font-bold text-foreground", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-sm text-muted-foreground leading-relaxed", children: product.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product.size_selector", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["S", "M", "L"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSize(s),
                className: `flex-1 rounded-xl py-2.5 text-xs font-semibold transition-smooth border-2 ${size === s ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`,
                "data-ocid": `product.size_${s.toLowerCase()}_button`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: s }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] font-normal opacity-80 mt-0.5", children: SIZE_LABELS[s] })
                ]
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => setShowNutrition((v) => !v),
              "data-ocid": "product.nutrition_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Nutritional Info" }),
                showNutrition ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
              ]
            }
          ),
          showNutrition && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-4 gap-2 bg-muted/60 rounded-2xl p-3",
              "data-ocid": "product.nutrition_panel",
              children: [
                ["Calories", product.nutritionalInfo.calories, "kcal"],
                ["Fat", product.nutritionalInfo.fat, "g"],
                ["Carbs", product.nutritionalInfo.carbs, "g"],
                ["Protein", product.nutritionalInfo.protein, "g"]
              ].map(([label, value, unit]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm text-foreground", children: [
                  value,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-normal ml-0.5", children: unit })
                ] })
              ] }, label))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted rounded-xl px-1 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-lg",
                  onClick: () => setQty((q) => Math.max(1, q - 1)),
                  "data-ocid": "product.qty_minus_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-6 text-center font-bold text-sm",
                  "data-ocid": "product.qty_display",
                  children: qty
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-lg",
                  onClick: () => setQty((q) => q + 1),
                  "data-ocid": "product.qty_plus_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl py-6 font-semibold shadow-toy text-sm gap-2",
                onClick: handleAddToCart,
                disabled: !product.available,
                "data-ocid": "product.add_to_cart_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                  "Add to Order · ",
                  formatPrice(finalPrice * qty)
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
const ALL_PRODUCTS = [
  {
    id: "classic-latte",
    name: "Classic Latte",
    description: "Espresso with steamed milk and a light layer of foam",
    imageUrl: "/assets/generated/product-classic-latte.dim_600x900.png",
    priceInCents: 545,
    category: "hotDrinks",
    nutritionalInfo: { calories: 190, fat: 7, carbs: 24, protein: 10 },
    available: true
  },
  {
    id: "pumpkin-spice-latte",
    name: "Pumpkin Spice Latte",
    description: "Espresso and pumpkin-flavored sauce, milk, fall spices and whipped cream",
    imageUrl: "/assets/generated/product-classic-latte.dim_600x900.png",
    priceInCents: 595,
    category: "hotDrinks",
    nutritionalInfo: { calories: 380, fat: 14, carbs: 52, protein: 14 },
    available: true
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Ristretto shots of espresso with whole milk microfoam",
    imageUrl: "/assets/generated/product-classic-latte.dim_600x900.png",
    priceInCents: 525,
    category: "hotDrinks",
    nutritionalInfo: { calories: 170, fat: 9, carbs: 15, protein: 9 },
    available: true
  },
  {
    id: "iced-caramel-macchiato",
    name: "Iced Caramel Macchiato",
    description: "Freshly steamed milk with vanilla-flavored syrup and bold espresso poured over ice",
    imageUrl: "/assets/generated/product-iced-caramel-macchiato.dim_600x900.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 250, fat: 7, carbs: 38, protein: 10 },
    available: true
  },
  {
    id: "pink-drink",
    name: "Pink Drink",
    description: "Starbucks Refresher with coconut milk, acai and passion fruit flavors",
    imageUrl: "/assets/generated/product-pink-drink.dim_600x900.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 140, fat: 2.5, carbs: 27, protein: 1 },
    available: true
  },
  {
    id: "cold-brew",
    name: "Cold Brew Coffee",
    description: "Slow-steeped cold brew coffee, ready to drink over ice",
    imageUrl: "/assets/generated/product-iced-caramel-macchiato.dim_600x900.png",
    priceInCents: 545,
    category: "coldDrinks",
    nutritionalInfo: { calories: 5, fat: 0, carbs: 0, protein: 1 },
    available: true
  },
  {
    id: "matcha-frappuccino",
    name: "Matcha Crème Frappuccino",
    description: "Sweet matcha green tea blended with milk and ice, topped with whipped cream",
    imageUrl: "/assets/generated/product-matcha-frappuccino.dim_600x900.png",
    priceInCents: 645,
    category: "frappuccinos",
    nutritionalInfo: { calories: 420, fat: 15, carbs: 66, protein: 5 },
    available: true
  },
  {
    id: "caramel-frappuccino",
    name: "Caramel Frappuccino",
    description: "Coffee blended with milk, ice and caramel sauce with whipped cream",
    imageUrl: "/assets/generated/product-caramel-frappuccino.dim_600x900.png",
    priceInCents: 625,
    category: "frappuccinos",
    nutritionalInfo: { calories: 410, fat: 15, carbs: 66, protein: 4 },
    available: true
  },
  {
    id: "java-chip-frappuccino",
    name: "Java Chip Frappuccino",
    description: "Frappuccino roast with mocha sauce, chips, milk and whipped cream",
    imageUrl: "/assets/generated/product-caramel-frappuccino.dim_600x900.png",
    priceInCents: 655,
    category: "frappuccinos",
    nutritionalInfo: { calories: 470, fat: 18, carbs: 72, protein: 6 },
    available: true
  },
  {
    id: "cinnamon-roll",
    name: "Classic Cinnamon Roll",
    description: "Soft, fluffy cinnamon roll with vanilla cream cheese icing",
    imageUrl: "/assets/generated/product-food-items.dim_600x900.png",
    priceInCents: 395,
    category: "food",
    nutritionalInfo: { calories: 420, fat: 14, carbs: 67, protein: 7 },
    available: true
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description: "Flaky, buttery croissant baked fresh daily",
    imageUrl: "/assets/generated/product-food-items.dim_600x900.png",
    priceInCents: 350,
    category: "food",
    nutritionalInfo: { calories: 240, fat: 12, carbs: 30, protein: 5 },
    available: true
  },
  {
    id: "chocolate-cake-pop",
    name: "Chocolate Cake Pop",
    description: "Moist chocolate cake dipped in a rich chocolatey coating",
    imageUrl: "/assets/generated/product-food-items.dim_600x900.png",
    priceInCents: 295,
    category: "food",
    nutritionalInfo: { calories: 170, fat: 8, carbs: 24, protein: 2 },
    available: true
  }
];
const CATEGORIES = [
  "hotDrinks",
  "coldDrinks",
  "frappuccinos",
  "food"
];
function Menu() {
  const params = useParams({ strict: false });
  const urlCategory = params.category;
  const [activeCategory, setActiveCategory] = reactExports.useState(
    urlCategory || "all"
  );
  const [search, setSearch] = reactExports.useState("");
  const [selectedProduct, setSelectedProduct] = reactExports.useState(null);
  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "menu.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest mb-1", children: "Little Wonders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Our Menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm", children: [
            ALL_PRODUCTS.length,
            " handcrafted items, ready to order"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:ml-auto relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search menu\\u2026",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9 rounded-2xl border-border w-full sm:w-64 bg-card",
              "data-ocid": "menu.search_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-green",
          "data-ocid": "menu.category_tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: activeCategory === "all" ? "default" : "outline",
                size: "sm",
                className: `rounded-full flex-shrink-0 font-semibold text-xs px-4 ${activeCategory === "all" ? "bg-primary text-primary-foreground shadow-sm" : "border-border hover:border-primary/50"}`,
                onClick: () => setActiveCategory("all"),
                "data-ocid": "menu.all_tab",
                children: "All"
              }
            ),
            CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: activeCategory === cat ? "default" : "outline",
                size: "sm",
                className: `rounded-full flex-shrink-0 font-semibold text-xs px-4 ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "border-border hover:border-primary/50"}`,
                onClick: () => setActiveCategory(cat),
                "data-ocid": `menu.${cat}_tab`,
                children: CATEGORY_LABELS[cat]
              },
              cat
            ))
          ]
        }
      ),
      search && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: filtered.length === 0 ? "No results" : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for “${search}”` }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 gap-4 text-center",
          "data-ocid": "menu.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold", children: "Nothing found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Try a different category or search term" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "rounded-full mt-1",
                onClick: () => {
                  setSearch("");
                  setActiveCategory("all");
                },
                children: "Clear filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: filtered.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductCard,
        {
          product,
          index: idx,
          onClick: setSelectedProduct
        },
        product.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductModal,
      {
        product: selectedProduct,
        onClose: () => setSelectedProduct(null)
      }
    )
  ] });
}
export {
  Menu as default
};
