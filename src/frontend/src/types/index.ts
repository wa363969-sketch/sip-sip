export type Category = "hotDrinks" | "coldDrinks" | "frappuccinos" | "food";

export interface NutritionalInfo {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
  category: Category;
  nutritionalInfo: NutritionalInfo;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalInCents: number;
}

export type OrderStatus = "placed" | "preparing" | "ready" | "pickedUp";

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceInCents: number;
}

export interface Order {
  id: number;
  customerId: string;
  items: OrderItem[];
  totalInCents: number;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
  estimatedPickupMinutes: number;
  stripeSessionId: string | null;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  hotDrinks: "Hot Drinks",
  coldDrinks: "Cold Drinks",
  frappuccinos: "Frappuccinos",
  food: "Food",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  placed: "Order Placed",
  preparing: "Preparing",
  ready: "Ready for Pickup",
  pickedUp: "Picked Up",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  placed: "bg-accent/20 text-accent-foreground",
  preparing: "bg-primary/20 text-primary",
  ready: "bg-primary/30 text-primary",
  pickedUp: "bg-muted text-muted-foreground",
};

export function formatPrice(cents: number | bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
