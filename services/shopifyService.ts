
import { Product, Order, Customer } from '../types';

// --- CONFIGURATION ---
// In a real deployment, these come from Environment Variables
const SHOPIFY_DOMAIN = process.env.REACT_APP_SHOPIFY_DOMAIN || 'palstyle48.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN || ''; // Public Token

const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

// --- MOCK DATA (Fallback) ---
const MOCK_SHOPIFY_ORDERS: Order[] = [
  { id: 'SH-1023', orderNumber: '#1023', customer: 'John Doe', platform: 'Shopify', status: 'Shipped', total: 120.00, date: '2024-05-19', items: 1 },
  { id: 'SH-1024', orderNumber: '#1024', customer: 'Sarah Smith', platform: 'Shopify', status: 'Pending', total: 450.00, date: '2024-05-20', items: 4 },
  { id: 'SH-1025', orderNumber: '#1025', customer: 'Mike Ross', platform: 'Shopify', status: 'Delivered', total: 890.00, date: '2024-05-21', items: 2 },
  { id: 'SH-1026', orderNumber: '#1026', customer: 'Emma Watson', platform: 'Shopify', status: 'Pending', total: 210.00, date: '2024-05-22', items: 1 },
];

const MOCK_SHOPIFY_CUSTOMERS: Customer[] = [
   { id: 'C-002', name: 'John Doe', email: 'john@example.com', totalSpent: 120, lastOrderDate: '2024-05-19', status: 'New', platform: 'Shopify' },
   { id: 'C-004', name: 'Mike Ross', email: 'mike.r@pearson.com', totalSpent: 3500, lastOrderDate: '2024-05-21', status: 'VIP', platform: 'Shopify' },
   { id: 'C-005', name: 'Emma Watson', email: 'emma@hollywood.com', totalSpent: 210, lastOrderDate: '2024-05-22', status: 'Regular', platform: 'Shopify' }
];

// --- GRAPHQL QUERIES ---
const PRODUCTS_QUERY = `
  query {
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

// --- SERVICE IMPLEMENTATION ---
export const ShopifyService = {
  
  authenticate: async (): Promise<boolean> => {
    // Check if we have a token
    if (STOREFRONT_ACCESS_TOKEN) {
        console.log(`%c[Shopify Headless] Authenticating via Storefront API...`, 'color: #95BF47; font-weight: bold;');
        try {
            // Simple ping to verify connectivity
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
                },
                body: JSON.stringify({ query: `{ shop { name } }` }),
            });
            const result = await response.json();
            if (result.data?.shop?.name) {
                console.log(`%c[Shopify Headless] Connected to ${result.data.shop.name}`, 'color: #95BF47;');
                return true;
            }
        } catch (e) {
            console.warn("Shopify Connection Failed, falling back to simulation.", e);
        }
    } else {
        console.log(`%c[Shopify Nexus] No Token Found. Running Simulation Mode.`, 'color: orange;');
    }
    
    // Simulate Handshake Latency
    await new Promise(resolve => setTimeout(resolve, 1200));
    return true;
  },

  syncInventory: async (products: Product[]) => {
      // In a real Headless setup, you typically PULL from Shopify, not push to it from client.
      // However, we can simulate the "Sync" action.
      console.log(`%c[Shopify Nexus] Syncing ${products.length} SKUs...`, 'color: cyan;');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { synced: products.length, channel: 'Shopify Storefront' };
  },

  fetchOrders: async (): Promise<Order[]> => {
      // Order fetching typically requires Admin API (Server-side). 
      // For a frontend dashboard, we simulate this or use a middleware.
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_SHOPIFY_ORDERS;
  },

  fetchCustomers: async (): Promise<Customer[]> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_SHOPIFY_CUSTOMERS;
  },

  // NEW: Fetch Real Products for the Store
  fetchRealProducts: async (): Promise<Product[] | null> => {
      if (!STOREFRONT_ACCESS_TOKEN) return null;

      try {
          const response = await fetch(API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
              },
              body: JSON.stringify({ query: PRODUCTS_QUERY }),
          });
          
          const { data } = await response.json();
          
          return data.products.edges.map((edge: any) => ({
              id: edge.node.id,
              name: edge.node.title,
              description: edge.node.description,
              image: edge.node.images.edges[0]?.node.src || '',
              price: parseFloat(edge.node.variants.edges[0]?.node.price.amount || '0'),
              category: 'Collection', // Default mapping
              stock: 10 // Storefront API doesn't expose stock level by default without checking inventory
          }));

      } catch (e) {
          console.error("Failed to fetch real products", e);
          return null;
      }
  }
};
