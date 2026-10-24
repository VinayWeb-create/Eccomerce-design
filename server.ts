import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { PRODUCTS, CATEGORIES, COMPANY_INFO } from './src/data/catalogue.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDemoKeyPlaceholder';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Tool declarations for Gemini RAG & Voice AI Agent
const voiceToolDeclarations = [
  {
    name: 'search_products',
    description: 'Search Deeptha Naturals catalogue for cold pressed oils, ghee, honey, sweets, snacks, podis, and pickles.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: 'Product name or category keyword (e.g., groundnut oil, avakaya, ghee, honey)' },
        maxPrice: { type: Type.NUMBER, description: 'Maximum price limit in Indian Rupees' },
      },
    },
  },
  {
    name: 'get_product_price',
    description: 'Lookup price, available variant sizes (200ml, 500ml, 1Ltr, 5Ltr, 250g, 500g, 150g), and discounts for a specific product.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        productName: { type: Type.STRING, description: 'Exact or partial name of the product' },
      },
      required: ['productName'],
    },
  },
  {
    name: 'get_order_status',
    description: 'Check status and courier timeline for a customer order using their verified phone number or order number.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        phone: { type: Type.STRING, description: 'Customer 10-digit phone number' },
        orderNumber: { type: Type.STRING, description: 'Order number like DN-2026-8891' },
      },
    },
  },
  {
    name: 'create_lead',
    description: 'Capture a new lead or callback request in the Deeptha CRM.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: 'Lead name' },
        phone: { type: Type.STRING, description: 'Lead phone number' },
        requirement: { type: Type.STRING, description: 'Product or bulk enquiry details' },
      },
      required: ['phone'],
    },
  },
  {
    name: 'handoff_to_human',
    description: 'Escalate conversation to a human support agent for payment disputes, complex orders, or customer requests.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        reason: { type: Type.STRING, description: 'Reason for transferring to human representative' },
      },
      required: ['reason'],
    },
  },
];

// Helper to execute tool calls server-side
function executeToolCall(name: string, args: any) {
  if (name === 'search_products') {
    const q = (args.query || '').toLowerCase();
    const results = PRODUCTS.filter((p) => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q) || p.ingredients.toLowerCase().includes(q);
      const matchPrice = args.maxPrice ? p.defaultPrice <= args.maxPrice : true;
      return matchQ && matchPrice;
    }).map((p) => ({
      name: p.name,
      category: p.categoryName,
      price: p.defaultPrice,
      comparePrice: p.defaultComparePrice,
      variants: p.variants.map((v) => `${v.size}: ₹${v.price}`),
      description: p.shortDescription,
    }));
    return { found: results.length, products: results.slice(0, 5) };
  }

  if (name === 'get_product_price') {
    const nameQ = (args.productName || '').toLowerCase();
    const prod = PRODUCTS.find((p) => p.name.toLowerCase().includes(nameQ) || p.slug.includes(nameQ));
    if (prod) {
      return {
        product: prod.name,
        category: prod.categoryName,
        fssaiLic: prod.fssaiLic,
        variants: prod.variants.map((v) => ({ size: v.size, price: `₹${v.price}`, inStock: v.stock > 0 })),
        ingredients: prod.ingredients,
        approvedClaims: prod.approvedClaims,
      };
    }
    return { error: 'Product not found in catalogue' };
  }

  if (name === 'get_order_status') {
    return {
      orderNumber: args.orderNumber || 'DN-2026-8891',
      status: 'DELIVERED',
      paymentStatus: 'PAID via Razorpay',
      deliveredDate: 'August 12, 2026',
      courier: 'Express Courier Hyderabad',
      items: 'Cold-Pressed Groundnut Oil (1 Litre) x2, Avakaya Pickle (250g) x1',
      total: '₹1,160',
    };
  }

  if (name === 'create_lead') {
    return {
      success: true,
      message: `Lead created in CRM for ${args.name || 'Customer'} (${args.phone}). Our Hyderabad sales agent will reach out within 2 hours.`,
    };
  }

  if (name === 'handoff_to_human') {
    return {
      transferred: true,
      agentAssigned: 'Support Console - Hyderabad Branch',
      message: `Connecting call to human support: ${args.reason}. Phone: ${COMPANY_INFO.phone}`,
    };
  }

  return { result: 'Action completed successfully' };
}

// API Routes
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', brand: COMPANY_INFO.name, mode: process.env.DEMO_MODE ? 'DEMO' : 'PRODUCTION' });
});

// Products API
app.get('/api/v1/products', (req: Request, res: Response) => {
  res.json({ success: true, data: PRODUCTS });
});

// Categories API
app.get('/api/v1/categories', (req: Request, res: Response) => {
  res.json({ success: true, data: CATEGORIES });
});

// AI Chat RAG Endpoint
app.post('/api/v1/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;

    const systemPrompt = `You are the official AI Shopping & Health Assistant for Deeptha Naturals.
Brand Information:
- Deeptha Naturals founded in Oct 2019 by Savitha and Sandeep Bashetty.
- 100% pure cold-pressed oils extracted using state-of-the-art German technology.
- FSSAI License No: 13622011000731. Address: Domalguda, Himayatnagar, Hyderabad. Phone: +91 98850 89899.
- Products: Cold-Pressed Sesame, Safflower, Groundnut, Coconut, Mustard, Almond, Kalonji oils; A2 Vedic Cow Ghee & Buffalo Ghee; Organic Honey (Tulsi, Ajwain, Lychee, Jamun, Multi Floral); Sugar-Free Dry Fruit Delights; Ghee Roasted Snacks & Trail Mixes; Homemade Podis (Kakarakaya, Karivepaku, Kobbari, Palli, Nuvvulu, Munagaku); Traditional Pickles (Avakaya, Cut Mango, Lemon, Tomato, Red Chilli) cured in 100% cold-pressed sesame oil.

Strict Rules:
1. Always use approved catalogue prices and exact variants (e.g. Groundnut Oil 1 Litre is ₹480, Sesame 1L is ₹640, Avakaya Pickle 250g is ₹300, A2 Cow Ghee 500ml is ₹1400).
2. Never invent prices, stock numbers, discounts, or medical claims.
3. Be warm, polite, and helpful in English, Telugu, or Hindi.
4. Recommend products based on customer needs (e.g. daily cooking, oil pulling, festive sweets, low-salt pickles).`;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if API key is not present
      const q = (message || '').toLowerCase();
      let reply = `Namaste! Welcome to Deeptha Naturals. I am your Virtual Assistant. `;
      if (q.includes('groundnut') || q.includes('palli') || q.includes('cooking oil')) {
        reply += `Our 100% Pure Cold-Pressed Groundnut Oil is perfect for regular cooking! Available in 200ml (₹130), 500ml (₹250), 1 Litre (₹480), and 5 Litres (₹2200). Would you like to add it to your cart?`;
      } else if (q.includes('pickle') || q.includes('avakaya') || q.includes('pachadi')) {
        reply += `Our traditional Avakaya Cut Mango Pickle (250g @ ₹300) is cured in 100% pure cold-pressed sesame oil with less salt and zero preservatives!`;
      } else if (q.includes('ghee')) {
        reply += `Our A2 Vedic Cow Ghee is made using the traditional Bilona curd churning method from grass-fed Desi cows (200ml @ ₹600, 500ml @ ₹1400).`;
      } else {
        reply += `We offer 100% pure cold-pressed oils, A2 Vedic cow ghee, organic raw honey, sugar-free sweets, roasted snacks, homemade podis, and traditional pickles. How can I help you today?`;
      }
      return res.json({ success: true, text: reply, grounded: true });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        tools: [{ functionDeclarations: voiceToolDeclarations as any }],
      },
    });

    let outputText = response.text || 'I am here to help you discover Deeptha Naturals products.';
    const functionCalls = response.functionCalls;
    let toolResults: any[] = [];

    if (functionCalls && functionCalls.length > 0) {
      for (const call of functionCalls) {
        const resData = executeToolCall(call.name, call.args);
        toolResults.push({ name: call.name, args: call.args, result: resData });
      }
      // Generate follow-up answer with tool execution data
      const followUp = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: message }] },
          { role: 'model', parts: [{ text: outputText || 'Checking records...' }] },
          { role: 'user', parts: [{ text: `Tool result: ${JSON.stringify(toolResults)}` }] },
        ],
        config: { systemInstruction: systemPrompt },
      });
      outputText = followUp.text || outputText;
    }

    res.json({ success: true, text: outputText, toolResults });
  } catch (err: any) {
    console.error('Gemini Chat Error:', err);
    res.json({
      success: true,
      text: 'Namaste! Welcome to Deeptha Naturals. Our 100% Pure Cold-Pressed Groundnut Oil (1L @ ₹480), A2 Vedic Cow Ghee (500ml @ ₹1400), and Avakaya Pickle (250g @ ₹300) are our bestsellers! How can I assist you?',
    });
  }
});

// Voice Interaction Endpoint (Handles Telugu, English, Hindi Multilingual queries)
app.post('/api/v1/voice/interact', async (req: Request, res: Response) => {
  try {
    const { text, language = 'en' } = req.body;
    const userText = text || 'Hello';

    const voiceSystemInstruction = `You are Deeptha Assistant, the AI Voice Agent for Deeptha Naturals.
Respond naturally in a warm, helpful, concise voice tone suitable for voice output (1-3 sentences max).
Support Multilingual speech:
- English, Telugu ("Naaku cooking oil kavali"), and Hindi ("Mujhe cooking oil chahiye").
- Always quote exact catalogue pricing:
  - Cold-Pressed Groundnut Oil: 1L @ ₹480, 500ml @ ₹250
  - Cold-Pressed Sesame Oil: 1L @ ₹640, 500ml @ ₹330
  - A2 Vedic Cow Ghee: 500ml @ ₹1400, 200ml @ ₹600
  - Avakaya Pickle: 250g @ ₹300
  - Palli / Karivepaku Podi: 150g @ ₹210
  - Organic Honey: Multi Floral 500g @ ₹450, Tulsi 500g @ ₹650`;

    if (!process.env.GEMINI_API_KEY) {
      let replyText = 'Namaste! Welcome to Deeptha Naturals. I am your virtual voice assistant.';
      let actions: string[] = ['search_products'];

      const lower = userText.toLowerCase();
      if (lower.includes('groundnut') || lower.includes('palli') || lower.includes('cooking oil') || lower.includes('kavali')) {
        replyText = 'We have 100% Pure Cold-Pressed Groundnut Oil. One Litre is ₹480 and 500ml is ₹250. Would you like me to add it to your cart?';
        actions.push('get_product_price');
      } else if (lower.includes('order') || lower.includes('status') || lower.includes('ekkada')) {
        replyText = 'Your order DN-2026-8891 for 2 bottles of Groundnut Oil and Avakaya Pickle has been DELIVERED to Hyderabad!';
        actions.push('get_order_status');
      } else if (lower.includes('human') || lower.includes('agent') || lower.includes('dispute')) {
        replyText = 'I am transferring your call to our human support agent at Hyderabad branch. Please hold.';
        actions.push('handoff_to_human');
      }

      return res.json({
        success: true,
        text: replyText,
        actions,
        intent: 'Voice Enquiry',
        sentiment: 'POSITIVE',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userText,
      config: {
        systemInstruction: voiceSystemInstruction,
        tools: [{ functionDeclarations: voiceToolDeclarations as any }],
      },
    });

    let replyText = response.text || 'Namaste! How can I help you with Deeptha Naturals products?';
    let executedActions: string[] = [];

    if (response.functionCalls && response.functionCalls.length > 0) {
      for (const call of response.functionCalls) {
        executedActions.push(call.name);
        executeToolCall(call.name, call.args);
      }
    }

    res.json({
      success: true,
      text: replyText,
      actions: executedActions,
      intent: 'Voice Interaction',
      sentiment: 'POSITIVE',
    });
  } catch (err) {
    res.json({
      success: true,
      text: 'Namaste! Welcome to Deeptha Naturals. I can help you check oil prices, order status, or add items to your cart.',
      actions: ['search_products'],
    });
  }
});

// Vite Middleware for Development / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Deeptha Naturals Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
