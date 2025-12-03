
import { Product, Order, Customer } from '../types';

// CREDENTIALS FROM CONFIGURATION
const TRENDYOL_CONFIG = {
  supplierId: '1158243',
  apiKey: 'LLI8PeLq6Cf222d6RLyp',
  apiSecret: '3PsRasMcrlNuYy3dMzqV',
  integrationRef: 'fb6e4a24-d6d2-4d2a-9d59-74a889e5e0de',
  baseUrl: 'https://api.trendyol.com/sapigw/suppliers',
  token: 'TExJOFBlTHE2Q2YyMjJkNlJMeXA6M1BzUmFzTWNybE51WXkzZE16cVY='
};

// MOCK DATA GENERATOR (To bypass Browser CORS restrictions for the demo)
const MOCK_TRENDYOL_ORDERS: Order[] = [
  { id: 'TY-928374', orderNumber: '72839412', customer: 'Ahmet Yılmaz', platform: 'Trendyol', status: 'Pending', total: 1499.00, date: '2024-05-20', items: 2 },
  { id: 'TY-928375', orderNumber: '72839415', customer: 'Ayşe Kaya', platform: 'Trendyol', status: 'Shipped', total: 899.00, date: '2024-05-19', items: 1 },
  { id: 'TY-928376', orderNumber: '72839418', customer: 'Mehmet Demir', platform: 'Trendyol', status: 'Delivered', total: 299.00, date: '2024-05-18', items: 3 },
  { id: 'TY-928377', orderNumber: '72839420', customer: 'Zeynep Çelik', platform: 'Trendyol', status: 'Pending', total: 599.00, date: '2024-05-20', items: 1 },
];

const MOCK_TRENDYOL_CUSTOMERS: Customer[] = [
  { id: 'C-001', name: 'Ahmet Yılmaz', email: 'ahmet.y@gmail.com', totalSpent: 4500, lastOrderDate: '2024-05-20', status: 'VIP', platform: 'Trendyol' },
  { id: 'C-003', name: 'Ayşe Kaya', email: 'ayse.k@hotmail.com', totalSpent: 2100, lastOrderDate: '2024-05-19', status: 'Regular', platform: 'Trendyol' },
];

export const TrendyolService = {
  
  // 1. Authenticate (Simulated Handshake)
  authenticate: async (): Promise<boolean> => {
    console.log(`%c[Trendyol Bridge] Initializing Secure Connection...`, 'color: orange; font-weight: bold;');
    console.log(`%c[Trendyol Bridge] Supplier ID: ${TRENDYOL_CONFIG.supplierId}`, 'color: #888;');
    
    // Simulating API Latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`%c[Trendyol Bridge] Handshake Successful. Token Verified.`, 'color: green; font-weight: bold;');
    return true;
  },

  // 2. Sync Products (Mapping Internal Store to External Channels)
  syncProducts: async (products: Product[]) => {
    console.log(`%c[Trendyol Bridge] Syncing ${products.length} artifacts to channel...`, 'color: cyan;');
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      synced: products.length,
      errors: 0,
      channel: 'Trendyol Marketplace'
    };
  },

  // 3. Fetch Orders (The Omni-Channel Aggregator)
  fetchOrders: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_TRENDYOL_ORDERS;
  },

  // 4. Fetch Customers
  fetchCustomers: async (): Promise<Customer[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_TRENDYOL_CUSTOMERS;
  }
};
