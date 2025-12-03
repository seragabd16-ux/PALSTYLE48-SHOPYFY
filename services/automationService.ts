import { AutomationRule, AutomationLog, Order, Product } from '../types';

// INITIAL RULES
const DEFAULT_RULES: AutomationRule[] = [
  {
    id: 'AUTO-001',
    name: 'Order Confirmation (WhatsApp)',
    type: 'WHATSAPP',
    trigger: 'ORDER_CREATED',
    isActive: true,
    template: "Hello {{name}}, your order #{{orderId}} from PALSTYLE48 is confirmed. We are preparing your armor.",
    stats: { executed: 1420, successRate: 99.8 }
  },
  {
    id: 'AUTO-002',
    name: 'Low Stock Alert (Admin)',
    type: 'SYSTEM',
    trigger: 'STOCK_LOW',
    isActive: true,
    template: "ALERT: Product {{productName}} has dropped below safe levels ({{stock}} remaining).",
    stats: { executed: 45, successRate: 100 }
  },
  {
    id: 'AUTO-003',
    name: 'VIP Welcome Protocol (Email)',
    type: 'EMAIL',
    trigger: 'CUSTOMER_VIP',
    isActive: true,
    template: "Welcome to the Inner Circle. Your loyalty has been noted. Exclusive access granted.",
    stats: { executed: 89, successRate: 98.5 }
  },
  {
    id: 'AUTO-004',
    name: 'Shipping Update (WhatsApp)',
    type: 'WHATSAPP',
    trigger: 'ORDER_CREATED', // Simulating shipping update after order
    isActive: false,
    template: "Your package is on the move. Tracking: {{tracking}}. Expect arrival in 2 days.",
    stats: { executed: 0, successRate: 0 }
  },
  {
    id: 'AUTO-005',
    name: 'AI Smart Auto-Reply',
    type: 'WHATSAPP',
    trigger: 'INCOMING_MESSAGE',
    isActive: true,
    template: "AI_GENERATED_RESPONSE",
    stats: { executed: 12, successRate: 100 }
  }
];

let logs: AutomationLog[] = [];

export const AutomationService = {
  getRules: () => DEFAULT_RULES,
  
  getLogs: () => logs,

  toggleRule: (id: string) => {
    const rule = DEFAULT_RULES.find(r => r.id === id);
    if (rule) rule.isActive = !rule.isActive;
    return [...DEFAULT_RULES];
  },

  // TRIGGER: NEW ORDER
  processOrderTrigger: async (order: Order) => {
    const activeRules = DEFAULT_RULES.filter(r => r.trigger === 'ORDER_CREATED' && r.isActive);
    
    for (const rule of activeRules) {
      await simulateExecution(rule, `Order #${order.orderNumber}`);
    }
  },

  // TRIGGER: LOW STOCK
  processStockTrigger: async (product: Product) => {
    const activeRules = DEFAULT_RULES.filter(r => r.trigger === 'STOCK_LOW' && r.isActive);
    
    for (const rule of activeRules) {
      await simulateExecution(rule, `SKU: ${product.name}`);
    }
  },

  // TRIGGER: INCOMING MESSAGE (Simulated)
  processMessageTrigger: async (messageText: string, sender: string) => {
    const activeRules = DEFAULT_RULES.filter(r => r.trigger === 'INCOMING_MESSAGE' && r.isActive);
    
    for (const rule of activeRules) {
      await simulateExecution(rule, `MSG from ${sender}: "${messageText.substring(0, 20)}..."`);
    }
  }
};

// SIMULATION ENGINE
const simulateExecution = async (rule: AutomationRule, context: string) => {
  // Add "Processing" log
  const logId = Math.random().toString(36).substr(2, 9);
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));

  const newLog: AutomationLog = {
    id: logId,
    timestamp,
    ruleName: rule.name,
    action: rule.type === 'WHATSAPP' ? 'DISPATCH_MSG' : rule.type === 'EMAIL' ? 'SEND_SMTP' : 'SYS_NOTIFY',
    status: 'SUCCESS',
    details: `${context} >> [SENT]`
  };

  logs = [newLog, ...logs].slice(0, 50); // Keep last 50 logs
  rule.stats.executed++;
};