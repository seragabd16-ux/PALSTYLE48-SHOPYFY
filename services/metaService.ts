import { WhatsAppTemplate } from '../types';

// CONFIGURATION
const META_CONFIG = {
  businessId: '1092837465',
  phoneNumberId: '1029384756',
  accessToken: 'EAAG...', // Placeholder
  apiVersion: 'v18.0'
};

// MOCK TEMPLATES
const MOCK_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'tmpl_001',
    name: 'welcome_offer_dark',
    category: 'MARKETING',
    language: 'en_US',
    status: 'APPROVED',
    components: [
      { type: 'HEADER', format: 'IMAGE' },
      { type: 'BODY', text: 'Welcome to the inner circle, {{1}}. Your exclusive access code is {{2}}. Wear the silence.' },
      { type: 'BUTTONS' }
    ]
  },
  {
    id: 'tmpl_002',
    name: 'order_dispatched_tactical',
    category: 'UTILITY',
    language: 'en_US',
    status: 'APPROVED',
    components: [
      { type: 'BODY', text: 'Deployment confirmed. Order #{{1}} is en route to coordinates provided. ETA: {{2}}.' }
    ]
  },
  {
    id: 'tmpl_003',
    name: 'abandoned_cart_recovery',
    category: 'MARKETING',
    language: 'en_US',
    status: 'APPROVED',
    components: [
      { type: 'BODY', text: 'You left something in the void. Secure your artifacts before the archive closes. Click to resume.' }
    ]
  },
  {
    id: 'tmpl_004',
    name: 'flash_drop_alert',
    category: 'MARKETING',
    language: 'ar',
    status: 'APPROVED',
    components: [
      { type: 'HEADER', format: 'VIDEO' },
      { type: 'BODY', text: 'انتبه: مجموعة جديدة متاحة الآن. الكمية محدودة جداً. تسوق قبل نفاذ المخزون.' }
    ]
  }
];

export const MetaService = {
  
  authenticate: async (): Promise<boolean> => {
    console.log(`%c[Meta Neural Bridge] Connecting to WhatsApp Business API...`, 'color: #25D366; font-weight: bold;');
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`%c[Meta Neural Bridge] Connection Established. Business ID: ${META_CONFIG.businessId}`, 'color: #25D366; font-weight: bold;');
    return true;
  },

  getTemplates: async (): Promise<WhatsAppTemplate[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_TEMPLATES;
  },

  sendTemplate: async (templateName: string, customerId: string, variables: string[]) => {
    console.log(`%c[Meta Dispatch] Sending template '${templateName}' to ${customerId}...`, 'color: cyan;');
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { success: true, messageId: `wamid.${Math.random().toString(36).substr(2, 15)}` };
  },

  simulateIncomingMessage: async () => {
    // Simulates a webhook event
    return {
      from: '+972599123456',
      text: 'Hello, where is my order?',
      timestamp: Date.now()
    };
  }
};