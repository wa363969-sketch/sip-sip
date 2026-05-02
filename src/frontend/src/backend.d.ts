import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    productId: string;
    productName: string;
    quantity: bigint;
    priceInCents: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    totalInCents: bigint;
    customerId: Principal;
    items: Array<OrderItem>;
    stripeSessionId?: string;
    estimatedPickupMinutes: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface NutritionalInfo {
    fat: number;
    carbs: number;
    calories: bigint;
    protein: number;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Cart {
    totalInCents: bigint;
    items: Array<CartItem>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface CartItem {
    productId: string;
    productName: string;
    quantity: bigint;
    priceInCents: bigint;
}
export interface Product {
    id: string;
    nutritionalInfo: NutritionalInfo;
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    category: Category;
    priceInCents: bigint;
}
export type OrderId = bigint;
export enum Category {
    food = "food",
    coldDrinks = "coldDrinks",
    hotDrinks = "hotDrinks",
    frappuccinos = "frappuccinos"
}
export enum OrderStatus {
    preparing = "preparing",
    placed = "placed",
    pickedUp = "pickedUp",
    ready = "ready"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(item: CartItem): Promise<void>;
    adminAddProduct(product: Product): Promise<void>;
    adminDeleteProduct(id: string): Promise<void>;
    adminGetAllOrders(): Promise<Array<Order>>;
    adminSetProductAvailability(id: string, available: boolean): Promise<void>;
    adminUpdateOrderStatus(id: OrderId, status: OrderStatus): Promise<void>;
    adminUpdateProduct(product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkout(successUrl: string, cancelUrl: string): Promise<string>;
    clearMyCart(): Promise<void>;
    confirmOrder(stripeSessionId: string): Promise<Order>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getMenuItem(id: string): Promise<Product | null>;
    getMenuItems(): Promise<Array<Product>>;
    getMenuItemsByCategory(category: Category): Promise<Array<Product>>;
    getMyCart(): Promise<Cart>;
    getMyOrder(id: OrderId): Promise<Order | null>;
    getMyOrders(): Promise<Array<Order>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeFromCart(productId: string): Promise<void>;
    searchMenuItems(term: string): Promise<Array<Product>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartItem(productId: string, quantity: bigint): Promise<void>;
}
