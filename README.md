# Deeptha Naturals - AI E-Commerce, CRM & Voice Operating System

Welcome to the **Deeptha Naturals** enterprise digital operating platform. Deeptha Naturals produces 100% pure cold-pressed oils, A2 Vedic cow ghee, organic honey, sugar-free sweets, roasted snacks, authentic homemade podis, and traditional pickles using state-of-the-art German technology and traditional methods.

## Key Features

1. **E-Commerce Storefront**:
   - Light Luxury D2C Aesthetic (Warm Ivory, Botanical Green, Gold Accents).
   - Real product catalog extracted from the official Deeptha Naturals catalogue.
   - Dynamic variant pricing, ingredients list, nutritional facts per 100g, usage guide, and FSSAI license display.
   - Smart keyword & category filtering with sticky purchase bar for mobile.

2. **Customer CRM & Customer 360°**:
   - Customer lifecycle progression (New Lead -> New Customer -> Repeat -> VIP -> Inactive -> Win-Back).
   - Unified activity timeline: Order history, voice call recordings & summaries, WhatsApp logs, support tickets, loyalty points, and notes.

3. **AI Conversational Shopping Assistant**:
   - Server-side Gemini 3.6 Flash integration with RAG grounding on approved catalogue data.
   - Natural language search (e.g. "I want groundnut oil 1 litre for daily cooking", "Show me pickles under 300").
   - Strict guardrails: No medical diagnoses or price hallucinations.

4. **AI Multilingual Voice Agent & Browser Tester**:
   - Realtime Voice AI with browser microphone test mode and animated waveform visualizer.
   - Supports English, Telugu ("Naaku cooking oil kavali"), and Hindi code-switching.
   - Tool calling layer: Search products, check variants & stock, add to cart, verify customer, get order status, create leads, schedule callbacks, handoff to human agents.

5. **WhatsApp & Email Automation Engine**:
   - Event-driven recovery flows for abandoned carts, order status notifications, reorder reminders, and win-back campaigns.

6. **Admin Dashboard & Support Console**:
   - Multi-role RBAC (Super Admin, Manager, Sales Agent, Support Agent).
   - Complete management for products, inventory, orders, customer 360, voice call logs, transcripts, campaign builder, audit logs, and analytics.

---

## Getting Started

### Prerequisites
- Node.js 20+
- Environment variables configured in `.env` (refer to `.env.example`).

### Running the App
```bash
# Development mode with Express backend + Vite frontend
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```
By default, the application runs on **port 3000** in `DEMO_MODE=true`, enabling full browser voice testing, mock payments, and interactive CRM automations.
