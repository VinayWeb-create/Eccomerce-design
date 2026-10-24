import {
  Cart,
  CartItem,
  Customer360,
  Order,
  Product,
  Review,
  User,
  VoiceCallRecord,
  CRMActivity,
} from '../types';
import { CATEGORIES, PRODUCTS } from '../data/catalogue';

const CART_KEY = 'deeptha_cart_v1';
const USER_KEY = 'deeptha_user_v1';
const ORDERS_KEY = 'deeptha_orders_v1';
const VOICE_LOGS_KEY = 'deeptha_voice_logs_v1';
const CRM_KEY = 'deeptha_crm_v1';

// Initial Mock User
export const DEFAULT_USER: User = {
  id: 'usr-demo-001',
  name: 'Vinay Avala',
  email: 'avalavinay8@gmail.com',
  phone: '+91 98850 89899',
  role: 'SUPER_ADMIN',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
};

// Initial Mock Orders
export const INITIAL_ORDERS: any[] = [
  {
    id: 'ord-1001',
    orderNumber: 'DN-2026-8891',
    customerId: 'cust-101',
    customerName: 'Avala Vinay',
    customerPhone: '+91 98850 89899',
    customerEmail: 'avalavinay8@gmail.com',
    shippingAddress: {
      street: 'Flat 402, SBH Colony, Domalguda',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500029',
      landmark: 'Near NTR Stadium',
    },
    items: [
      {
        id: 'ci-1',
        product: PRODUCTS[0],
        selectedVariant: PRODUCTS[0].variants[2],
        quantity: 2,
      },
      {
        id: 'ci-2',
        product: PRODUCTS[10],
        selectedVariant: PRODUCTS[10].variants[1],
        quantity: 1,
      },
    ],
    subtotal: 1260,
    discount: 100,
    shippingFee: 0,
    tax: 0,
    totalAmount: 1160,
    paymentMethod: 'RAZORPAY',
    paymentStatus: 'PAID',
    orderStatus: 'DELIVERED',
    timeline: [
      { status: 'PAID', note: 'Razorpay Payment Verified (pay_O9x817263)', timestamp: '2026-08-10 10:15 AM' },
      { status: 'PROCESSING', note: 'Order packed in German cold-press facility', timestamp: '2026-08-10 02:00 PM' },
      { status: 'SHIPPED', note: 'Dispatched via Express Courier', timestamp: '2026-08-11 09:30 AM' },
      { status: 'DELIVERED', note: 'Delivered to customer at Hyderabad', timestamp: '2026-08-12 04:15 PM' },
    ],
    createdAt: '2026-08-10T10:15:00Z',
    updatedAt: '2026-08-12T16:15:00Z',
  },
];


// Helper to manage local storage safely
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const apiClient = {
  // Products & Categories
  getProducts(): Product[] {
    return PRODUCTS;
  },

  getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  },

  getCategories() {
    return CATEGORIES;
  },

  searchProducts(query: string, categorySlug?: string, maxPrice?: number): Product[] {
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchesCategory = categorySlug ? p.categorySlug === categorySlug : true;
      const matchesPrice = maxPrice ? p.defaultPrice <= maxPrice : true;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.toLowerCase().includes(q);

      return matchesCategory && matchesPrice && matchesQuery;
    });
  },

  // Cart Management
  getCart(): Cart {
    return getStored<Cart>(CART_KEY, {
      items: [],
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0,
    });
  },

  addToCart(product: Product, variantId?: string, qty = 1): Cart {
    const cart = this.getCart();
    const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];
    const existingIndex = cart.items.findIndex(
      (item) => item.product.id === product.id && item.selectedVariant.id === variant.id
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += qty;
    } else {
      cart.items.push({
        id: `ci-${Date.now()}`,
        product,
        selectedVariant: variant,
        quantity: qty,
      });
    }

    return this.recalculateCart(cart);
  },

  updateCartQty(productId: string, variantId: string, quantity: number): Cart {
    const cart = this.getCart();
    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => !(item.product.id === productId && item.selectedVariant.id === variantId)
      );
    } else {
      const item = cart.items.find(
        (i) => i.product.id === productId && i.selectedVariant.id === variantId
      );
      if (item) item.quantity = quantity;
    }
    return this.recalculateCart(cart);
  },

  removeFromCart(productId: string, variantId: string): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(
      (item) => !(item.product.id === productId && item.selectedVariant.id === variantId)
    );
    return this.recalculateCart(cart);
  },

  applyCoupon(code: string): { cart: Cart; message: string; success: boolean } {
    const cart = this.getCart();
    if (code.toUpperCase() === 'DEEPTHA10') {
      cart.couponCode = 'DEEPTHA10';
      cart.discount = Math.round(cart.subtotal * 0.1);
      const updated = this.recalculateCart(cart);
      return { cart: updated, message: '10% Discount Applied!', success: true };
    } else if (code.toUpperCase() === 'WELCOME100') {
      cart.couponCode = 'WELCOME100';
      cart.discount = 100;
      const updated = this.recalculateCart(cart);
      return { cart: updated, message: '₹100 Welcome Discount Applied!', success: true };
    }
    return { cart, message: 'Invalid Coupon Code', success: false };
  },

  clearCart(): Cart {
    const emptyCart: Cart = { items: [], subtotal: 0, discount: 0, shipping: 0, total: 0 };
    setStored(CART_KEY, emptyCart);
    return emptyCart;
  },

  recalculateCart(cart: Cart): Cart {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.selectedVariant.price * item.quantity, 0);

    if (cart.couponCode === 'DEEPTHA10') {
      cart.discount = Math.round(cart.subtotal * 0.1);
    } else if (cart.couponCode === 'WELCOME100') {
      cart.discount = Math.min(100, cart.subtotal);
    } else {
      cart.discount = 0;
    }
    cart.shipping = cart.subtotal > 999 || cart.subtotal === 0 ? 0 : 50;
    cart.total = Math.max(0, cart.subtotal - cart.discount + cart.shipping);
    setStored(CART_KEY, cart);
    return cart;
  },

  // Orders
  getOrders(): Order[] {
    return getStored<Order[]>(ORDERS_KEY, INITIAL_ORDERS);
  },

  getOrderById(id: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id || o.orderNumber === id);
  },

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'timeline'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `DN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        { status: 'PAID', note: 'Payment verified successfully via Razorpay Gateway', timestamp: new Date().toLocaleString() },
        { status: 'PROCESSING', note: 'Order sent to Deeptha Naturals Hyderabad Cold-Press facility', timestamp: new Date().toLocaleString() },
      ],
    };

    orders.unshift(newOrder);
    setStored(ORDERS_KEY, orders);
    this.clearCart();
    this.addCRMActivity({
      customerId: 'cust-101',
      type: 'ORDER',
      title: `Placed Order ${newOrder.orderNumber}`,
      description: `Order value ₹${newOrder.totalAmount} (${newOrder.items.length} items)`,
      timestamp: new Date().toLocaleString(),
    });
    return newOrder;
  },

  // CRM & Voice Call History
  getVoiceCalls(): VoiceCallRecord[] {
    return getStored<VoiceCallRecord[]>(VOICE_LOGS_KEY, [
      {
        id: 'call-801',
        customerId: 'cust-101',
        customerName: 'Avala Vinay',
        phoneNumber: '+91 98850 89899',
        direction: 'INBOUND',
        status: 'COMPLETED',
        durationSeconds: 94,
        language: 'te',
        intent: 'Product Enquiry & Cart Addition',
        outcome: 'Cart item added (Groundnut Oil 1L)',
        aiHandled: true,
        humanHandoff: false,
        summary: 'Customer called asking for cooking oil recommendations in Telugu. AI recommended Cold-Pressed Groundnut Oil 1 Litre and added it to cart.',
        sentiment: 'POSITIVE',
        transcript: [
          { speaker: 'AI', text: 'Namaste, welcome to Deeptha Naturals. How can I assist you today?', timestamp: '00:02' },
          { speaker: 'Customer', text: 'Naaku regular cooking ki manchi groundnut oil 1 litre price entha?', timestamp: '00:10' },
          { speaker: 'AI', text: 'Our 100% Pure Cold-Pressed Groundnut Oil 1 Litre bottle is priced at ₹480 (discounted from ₹520). Would you like me to add it to your cart?', timestamp: '00:18' },
          { speaker: 'Customer', text: 'Yes, add 1 litre to my cart.', timestamp: '00:28' },
          { speaker: 'AI', text: 'I have added 1 Litre Cold-Pressed Groundnut Oil to your cart. You can complete checkout anytime!', timestamp: '00:35' },
        ],
        actionsTaken: ['search_products', 'get_product_price', 'add_to_cart'],
        createdAt: '2026-08-12T14:20:00Z',
      },
    ]);
  },

  addVoiceCallRecord(record: VoiceCallRecord): VoiceCallRecord {
    const logs = this.getVoiceCalls();
    logs.unshift(record);
    setStored(VOICE_LOGS_KEY, logs);
    this.addCRMActivity({
      customerId: record.customerId,
      type: 'CALL',
      title: `Voice Call (${record.durationSeconds}s - ${record.language.toUpperCase()})`,
      description: record.summary,
      timestamp: new Date().toLocaleString(),
    });
    return record;
  },

  getCRMActivities(): CRMActivity[] {
    return getStored<CRMActivity[]>(CRM_KEY, [
      {
        id: 'crm-1',
        customerId: 'cust-101',
        type: 'ORDER',
        title: 'Delivered Order DN-2026-8891',
        description: 'Total value ₹1160',
        timestamp: '2026-08-12 04:15 PM',
      },
      {
        id: 'crm-2',
        customerId: 'cust-101',
        type: 'CALL',
        title: 'Voice Enquiry regarding Groundnut Oil',
        description: 'Customer asked in Telugu for cooking oil prices.',
        timestamp: '2026-08-12 02:20 PM',
      },
      {
        id: 'crm-3',
        customerId: 'cust-101',
        type: 'WHATSAPP',
        title: 'Dispatched Shipping Notification Sent',
        description: 'Sent tracking link via WhatsApp Business API',
        timestamp: '2026-08-11 09:30 AM',
      },
    ]);
  },

  addCRMActivity(activity: Omit<CRMActivity, 'id'>): CRMActivity {
    const activities = this.getCRMActivities();
    const newAct: CRMActivity = { ...activity, id: `crm-${Date.now()}` };
    activities.unshift(newAct);
    setStored(CRM_KEY, activities);
    return newAct;
  },

  getCustomer360(): Customer360 {
    const orders = this.getOrders();
    const calls = this.getVoiceCalls();
    const crm = this.getCRMActivities();
    const totalRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    return {
      id: 'cust-101',
      name: 'Avala Vinay',
      phone: '+91 98850 89899',
      email: 'avalavinay8@gmail.com',
      location: 'Hyderabad, Telangana',
      source: 'Direct Website / Telugu Voice Assistant',
      lifecycleStage: 'REPEAT_CUSTOMER',
      firstInteraction: '2026-08-01',
      firstPurchase: '2026-08-10',
      lastPurchase: '2026-08-10',
      totalOrders: orders.length,
      totalRevenue: totalRev,
      averageOrderValue: orders.length ? Math.round(totalRev / orders.length) : 0,
      preferredCategories: ['Cold-Pressed Oils', 'Traditional Pickles', 'Ghee'],
      tags: ['High Value', 'Telugu Voice User', 'Repeat Customer', 'Hyderabad Local'],
      notes: [
        'Prefers 1 Litre Groundnut Oil for regular family cooking.',
        'Enquired about Avakaya Pickle expiry date - verified 6 months shelf life with cold-pressed sesame oil.',
      ],
      loyaltyPoints: 340,
      subscriptionsCount: 1,
      recentCalls: calls,
      crmActivities: crm,
    };
  },

  // Backend API Async Calls
  async sendAIChat(message: string, conversationHistory: any) {
    return this.sendAIChatMessage(message, conversationHistory);
  },

  async sendVoiceInteraction(userSpeech: string, language: string) {
    return this.interactVoice(userSpeech, language);
  },

  async sendAIChatMessage(message: string, conversationHistory: { role: 'user' | 'model'; parts: string }[]) {

    try {
      const response = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversationHistory }),
      });
      return await response.json();
    } catch (err) {
      return { success: false, text: 'I am unable to reach the Deeptha server right now. Please try again.' };
    }
  },

  async interactVoice(userSpeech: string, language: string) {
    try {
      const response = await fetch('/api/v1/voice/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userSpeech, language }),
      });
      return await response.json();
    } catch (err) {
      return {
        success: false,
        text: 'Apologies, I could not connect to the voice gateway. Please try again.',
        actions: [],
      };
    }
  },
};
