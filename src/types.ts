export type Role =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'MANAGER'
  | 'SALES_AGENT'
  | 'SUPPORT_AGENT'
  | 'MARKETING_MANAGER'
  | 'CONTENT_MANAGER'
  | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
}

export type CategorySlug =
  | 'cold-pressed-oils'
  | 'ghee'
  | 'honey'
  | 'sweets'
  | 'snacks'
  | 'homemade-podis'
  | 'pickles';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  image: string;
  itemCount: number;
}

export interface ProductVariant {
  id: string;
  size: string; // e.g., "200 ml", "500 ml", "1 Litre", "5 Litres", "250g", "500g", "150g"
  price: number;
  comparePrice?: number;
  stock: number;
  sku: string;
}

export interface NutritionFacts {
  portion: string; // e.g., "per 100g"
  calories: string;
  totalFat?: string;
  saturatedFat?: string;
  polyunsaturatedFat?: string;
  monounsaturatedFat?: string;
  carbohydrates?: string;
  protein?: string;
  sodium?: string;
  cholesterol?: string;
  additional?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  categorySlug: CategorySlug;
  description: string;
  shortDescription: string;
  ingredients: string;
  nutritionFacts: NutritionFacts;
  approvedClaims: string[];
  usageInfo: string;
  images: string[];
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  defaultPrice: number;
  defaultComparePrice?: number;
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  fssaiLic: string;
  requiresAdminConfirmation?: boolean;
}

export interface CustomerProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}


export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  couponCode?: string;
  total: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface OrderTimelineItem {
  status: OrderStatus;
  note: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  paymentMethod: 'RAZORPAY' | 'UPI' | 'COD';
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  orderStatus: OrderStatus;
  timeline: OrderTimelineItem[];
  createdAt: string;
  updatedAt: string;
}

export type CustomerLifecycleStage =
  | 'NEW_LEAD'
  | 'NEW_CUSTOMER'
  | 'REPEAT_CUSTOMER'
  | 'VIP'
  | 'INACTIVE'
  | 'WIN_BACK';

export interface Customer360 {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  source: string;
  lifecycleStage: CustomerLifecycleStage;
  firstInteraction: string;
  firstPurchase?: string;
  lastPurchase?: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  preferredCategories: string[];
  tags: string[];
  notes: string[];
  loyaltyPoints: number;
  subscriptionsCount: number;
  recentCalls: VoiceCallRecord[];
  crmActivities: CRMActivity[];
}

export interface CRMActivity {
  id: string;
  customerId: string;
  type: 'CALL' | 'WHATSAPP' | 'EMAIL' | 'ORDER' | 'CART' | 'NOTE' | 'SUPPORT' | 'CAMPAIGN' | 'AI';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface VoiceCallRecord {
  id: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  direction: 'INBOUND' | 'OUTBOUND';
  status: 'CONNECTED' | 'COMPLETED' | 'MISSED' | 'HANDOFF';
  durationSeconds: number;
  language: 'en' | 'te' | 'hi';
  intent: string;
  outcome: string;
  aiHandled: boolean;
  humanHandoff: boolean;
  summary: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  transcript: { speaker: 'AI' | 'Customer'; text: string; timestamp: string }[];
  actionsTaken: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  image: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  triggerEvent: string;
  conditions: string;
  actions: string[];
  status: 'ACTIVE' | 'PAUSED';
  runsCount: number;
  successRate: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
}
