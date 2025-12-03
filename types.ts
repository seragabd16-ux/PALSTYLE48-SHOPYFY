export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  barcode?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AnalyticsData {
  name: string;
  sales: number;
  revenue: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  lastOrderDate: string;
  status: 'VIP' | 'Regular' | 'New';
  platform: 'Shopify' | 'Trendyol' | 'Manual';
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  platform: 'Trendyol' | 'Shopify' | 'App';
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  date: string;
  items: number;
}

// --- AUTOMATION TYPES ---
export interface AutomationRule {
  id: string;
  name: string;
  type: 'WHATSAPP' | 'EMAIL' | 'SYSTEM';
  trigger: 'ORDER_CREATED' | 'STOCK_LOW' | 'CUSTOMER_VIP' | 'ABANDONED_CART' | 'INCOMING_MESSAGE';
  isActive: boolean;
  template: string;
  stats: {
    executed: number;
    successRate: number;
  };
}

export interface AutomationLog {
  id: string;
  timestamp: string;
  ruleName: string;
  action: string;
  status: 'SUCCESS' | 'FAILED' | 'PROCESSING';
  details: string;
}

// --- META / WHATSAPP TYPES ---
export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  components: {
    type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
    text?: string;
    format?: 'TEXT' | 'IMAGE' | 'VIDEO';
  }[];
}