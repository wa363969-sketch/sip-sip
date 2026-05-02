import { c as createLucideIcon, u as useCart, j as jsxRuntimeExports, m as motion, B as Badge, a as Button, L as Link, C as CATEGORY_LABELS, f as formatPrice, S as ShoppingCart, r as reactExports } from "./index-YPr-t_r6.js";
import { C as ChevronRight } from "./chevron-right-B600Nthi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const FEATURED_PRODUCTS = [
  {
    id: "iced-caramel-macchiato",
    name: "Iced Caramel Macchiato",
    description: "Freshly steamed milk with vanilla-flavored syrup and bold espresso poured over ice",
    imageUrl: "/assets/generated/product-iced-caramel-macchiato.dim_400x600.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 250, fat: 7, carbs: 38, protein: 10 },
    available: true
  },
  {
    id: "pink-drink",
    name: "Pink Drink",
    description: "Starbucks Refresher with coconut milk and acai and passion fruit flavors",
    imageUrl: "/assets/generated/product-pink-drink.dim_400x600.png",
    priceInCents: 595,
    category: "coldDrinks",
    nutritionalInfo: { calories: 140, fat: 2.5, carbs: 27, protein: 1 },
    available: true
  },
  {
    id: "cinnamon-roll",
    name: "Classic Cinnamon Roll",
    description: "Soft, fluffy cinnamon roll with vanilla cream cheese icing",
    imageUrl: "/assets/generated/product-cinnamon-roll.dim_400x600.png",
    priceInCents: 395,
    category: "food",
    nutritionalInfo: { calories: 420, fat: 14, carbs: 67, protein: 7 },
    available: true
  },
  {
    id: "matcha-frappuccino",
    name: "Matcha Crème Frappuccino",
    description: "Sweet matcha green tea blended with milk and ice, topped with whipped cream",
    imageUrl: "/assets/generated/product-matcha-frappuccino.dim_400x600.png",
    priceInCents: 645,
    category: "frappuccinos",
    nutritionalInfo: { calories: 420, fat: 15, carbs: 66, protein: 5 },
    available: true
  }
];
const CATEGORY_ITEMS = [
  { category: "hotDrinks", emoji: "☕", desc: "Lattes, Americanos & more" },
  { category: "coldDrinks", emoji: "🧋", desc: "Refreshers & Iced teas" },
  { category: "frappuccinos", emoji: "🥤", desc: "Blended frozen drinks" },
  { category: "food", emoji: "🧁", desc: "Pastries & snacks" }
];
function MiniatureStore({ onClick }) {
  const [isHovered, setIsHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "relative select-none cursor-pointer group w-full text-left bg-transparent border-0 p-0",
      style: { perspective: "900px" },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick,
      "data-ocid": "home.miniature_store",
      "aria-label": "Enter the Starbucks miniature store",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-sm mx-auto transition-smooth",
          style: {
            transform: isHovered ? "rotateX(5deg) scale(1.02)" : "rotateX(2deg) scale(1)",
            transformOrigin: "center bottom",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] opacity-60",
                style: {
                  width: "110%",
                  height: "32px",
                  background: "oklch(0.78 0.06 54)",
                  boxShadow: "0 12px 40px -4px rgba(0,60,30,0.35)",
                  filter: "blur(2px)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] w-full rounded-3xl overflow-hidden shadow-toy", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/starbucks-miniature-store.dim_600x900.png",
                  alt: "Starbucks Little Wonders miniature store",
                  className: "w-full h-full object-cover transition-smooth",
                  style: { transform: isHovered ? "scale(1.04)" : "scale(1)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%, rgba(0,0,0,0.04) 100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none transition-smooth",
                  style: {
                    background: isHovered ? "radial-gradient(ellipse at 50% 60%, rgba(255,200,80,0.15) 0%, transparent 70%)" : "radial-gradient(ellipse at 50% 60%, rgba(255,200,80,0.08) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex items-end justify-center pb-6 transition-smooth",
                  style: { opacity: isHovered ? 1 : 0 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl font-semibold text-sm shadow-float",
                      style: {
                        transform: isHovered ? "translateY(0)" : "translateY(8px)",
                        transition: "transform 0.3s ease"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }),
                        "Enter the Store"
                      ]
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { y: [-4, 4, -4] },
                transition: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                },
                className: "absolute -bottom-4 -right-4 z-10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-accent text-accent-foreground px-4 py-2 rounded-2xl shadow-float font-semibold text-sm", children: "🎁 Blind-Box Surprise!" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] },
                transition: {
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5
                },
                className: "absolute -top-3 -left-3 z-10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground w-9 h-9 rounded-xl flex items-center justify-center shadow-float", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }) })
              }
            )
          ]
        }
      )
    }
  );
}
function Home() {
  const { addToCart } = useCart();
  function handleStoreClick() {
    window.location.href = "/menu";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative bg-card overflow-hidden",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 pointer-events-none overflow-hidden",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -top-24 -right-24 w-96 h-96 rounded-full",
                    style: {
                      background: "radial-gradient(circle, oklch(0.38 0.15 142 / 0.07) 0%, transparent 70%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 -left-16 w-72 h-72 rounded-full",
                    style: {
                      background: "radial-gradient(circle, oklch(0.65 0.22 54 / 0.08) 0%, transparent 70%)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 py-12 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6 },
                className: "order-2 lg:order-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-4 bg-accent/20 text-accent-foreground border-0 rounded-full px-3 py-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3 h-3 mr-1" }),
                    " Blind-Box Collection 2026"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-6xl font-bold leading-tight text-foreground", children: [
                    "Welcome to ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Little Wonders!" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-lg max-w-md", children: "Order your favorite Starbucks drinks and collect adorable miniature chibi toy figures with every purchase." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        asChild: true,
                        size: "lg",
                        className: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl shadow-float font-semibold px-8",
                        "data-ocid": "home.order_now_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", children: "Order Now" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "lg",
                        className: "rounded-2xl border-2 border-primary/30 font-semibold px-8",
                        onClick: () => {
                          var _a;
                          return (_a = document.getElementById("featured")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                        },
                        "data-ocid": "home.explore_button",
                        children: "Explore Menu"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: "50+" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Menu Items" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: "12" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Toy Figures" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: "5★" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Rating" })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.92, y: 16 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: {
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.34, 1.56, 0.64, 1]
                },
                className: "order-1 lg:order-2 flex justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[320px] lg:max-w-[360px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MiniatureStore, { onClick: handleStoreClick }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6 font-medium", children: "✨ Click the store to enter" })
                ] })
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12",
        "data-ocid": "home.categories_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-6", children: "Browse by Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: CATEGORY_ITEMS.map(({ category, emoji, desc }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/menu/$category",
                  params: { category },
                  className: "flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-toy hover:shadow-toy-hover transition-smooth text-center group block",
                  "data-ocid": `home.category_${category}_link`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl group-hover:animate-float inline-block", children: emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: CATEGORY_LABELS[category] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
                    ] })
                  ]
                }
              )
            },
            category
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "featured",
        className: "py-12 bg-background",
        "data-ocid": "home.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Customer Favorites" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/menu",
                className: "text-primary text-sm font-semibold hover:underline flex items-center gap-1",
                "data-ocid": "home.view_all_link",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: FEATURED_PRODUCTS.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.08, duration: 0.5 },
              className: "bg-card rounded-2xl overflow-hidden shadow-toy hover:shadow-toy-hover transition-smooth group",
              "data-ocid": `home.product_card.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[2/3] overflow-hidden relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: product.imageUrl,
                      alt: product.name,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/90 text-primary-foreground text-xs border-0 rounded-full", children: CATEGORY_LABELS[product.category] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: formatPrice(product.priceInCents) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        className: "h-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs",
                        onClick: () => addToCart(product),
                        "data-ocid": `home.add_to_cart_button.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3 mr-1" }),
                          " Add"
                        ]
                      }
                    )
                  ] })
                ] })
              ]
            },
            product.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary py-16 overflow-hidden",
        "data-ocid": "home.collection_banner",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-10 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -24 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-4 bg-primary-foreground/20 text-primary-foreground border-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 mr-1 fill-current" }),
                  " Limited Edition"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl lg:text-4xl font-bold text-primary-foreground", children: "Your Next Favorite Surprise" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-primary-foreground/80 text-lg", children: "Collect all 12 chibi Starbucks characters. Each order includes a mystery blind-box toy figure!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl font-semibold shadow-float",
                      "data-ocid": "home.collect_now_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", children: "Collect Now" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 rounded-2xl font-semibold",
                      "data-ocid": "home.discover_toys_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", children: "Discover Toys" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 24 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.15 },
              className: "flex justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/starbucks-chibi-figures.dim_600x900.png",
                    alt: "Chibi Starbucks collectible figures",
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: { y: [-5, 5, -5] },
                    transition: {
                      duration: 3.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    },
                    className: "absolute -top-4 -right-4",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-accent text-accent-foreground px-3 py-1.5 rounded-xl shadow-float font-bold text-sm", children: "🎲 12 to collect!" })
                  }
                )
              ] })
            }
          )
        ] }) })
      }
    )
  ] });
}
export {
  Home as default
};
