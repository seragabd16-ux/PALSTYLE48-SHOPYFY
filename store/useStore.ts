
import { create } from 'zustand';
import { Product, CartItem, Order, Customer, AutomationRule, AutomationLog, WhatsAppTemplate } from '../types';
import { TrendyolService } from '../services/trendyolService';
import { ShopifyService } from '../services/shopifyService';
import { AutomationService } from '../services/automationService';
import { MetaService } from '../services/metaService';

interface StoreState {
  products: Product[];
  cart: CartItem[];
  isAdmin: boolean;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  importProducts: (products: Product[]) => void; // NEW: Bulk Import
  addToCart: (product: Product, selectedSize?: string) => void;
  removeFromCart: (id: string, selectedSize?: string) => void;
  toggleCart: () => void;
  isCartOpen: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleAdmin: () => void;
  language: 'en' | 'tr' | 'ar';
  setLanguage: (lang: 'en' | 'tr' | 'ar') => void;
  currency: 'USD' | 'EUR' | 'TRY' | 'ILS';
  setCurrency: (curr: 'USD' | 'EUR' | 'TRY' | 'ILS') => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  heroVideoUrl: string | null;
  setHeroVideoUrl: (url: string) => void;
  
  // Admin State
  dashboardView: 'overview' | 'omni' | 'marketing' | 'inbox' | 'orders' | 'customers' | 'automation';
  setDashboardView: (view: 'overview' | 'omni' | 'marketing' | 'inbox' | 'orders' | 'customers' | 'automation') => void;
  
  // Data State
  orders: Order[];
  customers: Customer[];
  isSyncing: boolean;
  syncData: () => Promise<void>;

  // Automation State
  automationRules: AutomationRule[];
  automationLogs: AutomationLog[];
  toggleAutomationRule: (id: string) => void;

  // Meta/WhatsApp State
  whatsAppTemplates: WhatsAppTemplate[];
  fetchWhatsAppTemplates: () => Promise<void>;
  sendWhatsAppCampaign: (templateId: string, segment: string) => Promise<void>;
}

// 10 REAL ARTIFACTS FROM CSV DATA
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'PLS-SLV-104',
    name: 'PALESTINE MAP SILVER NECKLACE',
    price: 1499,
    category: 'Accessories',
    image: 'https://cdn.dsmcdn.com/ty1792/prod/QC_PREP/20251120/03/8d048687-8044-366c-8a80-31955b45c132/1_org_zoom.jpg',
    description: '925 Sterling Silver. A symbol of existence and resilience. Minimalist design without stones. Unisex architecture.',
    stock: 25
  },
  {
    id: 'PLS-SLV-103',
    name: 'FREE PALESTINE MAP NECKLACE',
    price: 1499,
    category: 'Accessories',
    image: 'https://cdn.dsmcdn.com/ty1793/prod/QC_PREP/20251120/02/1dc4301e-b1d5-3b4f-8238-47b4845d8327/1_org_zoom.jpg',
    description: 'Local production reflecting quality standards. 925 Sterling Silver. Long-lasting use and stylish appearance.',
    stock: 23
  },
  {
    id: 'PLS-SLV-102',
    name: 'GAZA RESISTANCE SYMBOL',
    price: 1499,
    category: 'Accessories',
    image: 'https://cdn.dsmcdn.com/ty1790/prod/QC_PREP/20251116/17/94b88496-42d6-3b2c-b200-f0bf70f1f1a2/1_org_zoom.jpg',
    description: 'Filistin Direniş Simgesi. 925 Sterling Silver. Minimalist design for those seeking refined style.',
    stock: 30
  },
  {
    id: 'PLS-TSH-105',
    name: 'NEWSPAPER RESISTANCE TEE',
    price: 599,
    category: 'T-Shirts',
    image: 'https://cdn.dsmcdn.com/ty1790/prod/QC_PREP/20251114/21/22c59b8a-9342-36bd-b2d1-c39695d61993/1_org_zoom.jpg',
    description: 'Unisex oversize fit. Breathable knitted fabric. A statement of history and resistance worn on the chest.',
    stock: 15
  },
  {
    id: 'PLS-TSH-104',
    name: 'JERUSALEM HERITAGE TEE',
    price: 699,
    category: 'T-Shirts',
    image: 'https://cdn.dsmcdn.com/ty1790/prod/QC_PREP/20251114/20/509e599e-3d2f-3dff-afc9-e50633d9e4b8/1_org_zoom.jpg',
    description: 'Filistin Mirası. Oversize comfort. Sustainable fashion approach supporting local craftsmanship.',
    stock: 30
  },
  {
    id: 'PLS-TSH-102',
    name: 'MUSIC PLAY ICON OVERSIZE',
    price: 599,
    category: 'T-Shirts',
    image: 'https://cdn.dsmcdn.com/ty1789/prod/QC_PREP/20251114/19/058542f2-991b-3bd2-9adb-2745b7604e38/1_org_zoom.jpg',
    description: 'The rhythm of resistance. Unisex design suitable for all. High quality cotton blend.',
    stock: 4
  },
  {
    id: 'PLS-HOD-112',
    name: 'GAZA SQUAD HOODIE',
    price: 899,
    category: 'Hoodies',
    image: 'https://cdn.dsmcdn.com/ty1786/prod/QC_PREP/20251111/17/74b5be6e-764a-35db-b93b-f0082a335682/1_org_zoom.jpg',
    description: 'Unisex Oversize. Spirit of Gaza DTF print. 3-thread weaving for durability and warmth.',
    stock: 39
  },
  {
    id: 'PLS-HOD-111',
    name: 'MARIO STREET HOODIE',
    price: 899,
    category: 'Hoodies',
    image: 'https://cdn.dsmcdn.com/ty1786/prod/QC_PREP/20251110/01/eb017650-5907-3968-aafe-d98fa10ceb85/1_org_zoom.jpg',
    description: 'Filistin Sokak Modası. Modern oversize silhouette. Hooded protection for the cold urban environment.',
    stock: 50
  },
  {
    id: 'PLS-HOD-109',
    name: 'TATREEZ PATCH HOODIE',
    price: 899,
    category: 'Hoodies',
    image: 'https://cdn.dsmcdn.com/ty1786/prod/QC_PREP/20251110/00/6d060f4c-20de-37ec-b292-3f34cf8d8b13/1_org_zoom.jpg',
    description: 'Embroidered with the threads of history. 3-thread fabric. High contrast aesthetic.',
    stock: 10
  },
  {
    id: 'PLS-HOD-107',
    name: 'JERUSALEM MAP HOODIE',
    price: 1200,
    category: 'Hoodies',
    image: 'https://cdn.dsmcdn.com/ty1786/prod/QC_ENRICHMENT/20251110/20/161a3bd1-276b-3e36-a04b-dbb4918e53b9/1_org_zoom.jpg',
    description: 'Map Design. Khaki/Black tones. Casual style with heavy durability.',
    stock: 40
  }
];

export const useStore = create<StoreState>((set, get) => ({
  products: INITIAL_PRODUCTS,
  cart: [],
  isAdmin: false,
  isCartOpen: false,
  isMenuOpen: false,
  language: 'en',
  currency: 'USD',
  isDarkMode: true,
  heroVideoUrl: null,
  dashboardView: 'overview',
  
  orders: [],
  customers: [],
  isSyncing: false,

  // Automation State
  automationRules: AutomationService.getRules(),
  automationLogs: [],

  // Meta State
  whatsAppTemplates: [],

  setHeroVideoUrl: (url) => set({ heroVideoUrl: url }),
  setLanguage: (lang) => set({ language: lang }),
  setCurrency: (curr) => set({ currency: curr }),
  setDashboardView: (view) => set({ dashboardView: view }),
  toggleTheme: () => set((state) => {
    if (state.isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    return { isDarkMode: !state.isDarkMode };
  }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  deleteProduct: (id) => set((state) => ({ 
    products: state.products.filter((p) => p.id !== id) 
  })),
  updateProduct: (id, updates) => set((state) => ({
    products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
  })),
  importProducts: (newProducts) => set((state) => ({
    products: [...state.products, ...newProducts]
  })),
  addToCart: (product, selectedSize = 'M') => set((state) => {
    const existing = state.cart.find((item) => item.id === product.id && (item as any).selectedSize === selectedSize);
    
    // Check Stock Automation
    if (product.stock <= 5) {
       AutomationService.processStockTrigger(product).then(() => {
          set({ automationLogs: AutomationService.getLogs() });
       });
    }

    if (existing) {
      return {
        cart: state.cart.map((item) => 
          item.id === product.id && (item as any).selectedSize === selectedSize ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1, selectedSize } as any] };
  }),
  removeFromCart: (id, selectedSize) => set((state) => ({
    cart: state.cart.filter(item => !(item.id === id && (item as any).selectedSize === selectedSize))
  })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),

  toggleAutomationRule: (id) => {
    const newRules = AutomationService.toggleRule(id);
    set({ automationRules: newRules });
  },

  // --- SYNC ACTIONS ---
  syncData: async () => {
    set({ isSyncing: true });
    
    // 1. Parallel Authenticate
    const [trendyolAuth, shopifyAuth, metaAuth] = await Promise.all([
         TrendyolService.authenticate(),
         ShopifyService.authenticate(),
         MetaService.authenticate()
    ]);
    
    if (trendyolAuth && shopifyAuth && metaAuth) {
      // 2. Sync Products (Push)
      await Promise.all([
          TrendyolService.syncProducts(get().products),
          ShopifyService.syncInventory(get().products)
      ]);
      
      // 3. Fetch Data (Pull)
      const [tOrders, sOrders] = await Promise.all([
          TrendyolService.fetchOrders(),
          ShopifyService.fetchOrders()
      ]);

      const [tCustomers, sCustomers] = await Promise.all([
          TrendyolService.fetchCustomers(),
          ShopifyService.fetchCustomers()
      ]);
      
      const combinedOrders = [...tOrders, ...sOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const combinedCustomers = [...tCustomers, ...sCustomers];

      // 4. Trigger Automation on New Orders
      // In a real app, we'd filter for *new* orders. Here we simulate 1 trigger for effect.
      if (combinedOrders.length > 0) {
         await AutomationService.processOrderTrigger(combinedOrders[0]);
      }

      set({ 
          orders: combinedOrders, 
          customers: combinedCustomers, 
          isSyncing: false,
          automationLogs: AutomationService.getLogs() 
      });
    } else {
      set({ isSyncing: false });
      console.error("Sync Failed: Authentication Error on one or more bridges.");
    }
  },

  fetchWhatsAppTemplates: async () => {
    const templates = await MetaService.getTemplates();
    set({ whatsAppTemplates: templates });
  },

  sendWhatsAppCampaign: async (templateId, segment) => {
    const tmpl = get().whatsAppTemplates.find(t => t.id === templateId);
    if (!tmpl) return;
    
    // Simulate sending
    await MetaService.sendTemplate(tmpl.name, segment, ['Customer', 'CODE123']);
    set({ 
        automationLogs: [
            { id: Math.random().toString(), timestamp: new Date().toLocaleTimeString(), ruleName: 'Manual Campaign', action: 'WHATSAPP_BROADCAST', status: 'SUCCESS', details: `Template ${tmpl.name} sent to ${segment}` },
            ...get().automationLogs
        ]
    });
  }
}));
