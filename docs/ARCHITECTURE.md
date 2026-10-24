# DEEPTHA NATURALS - SYSTEM ARCHITECTURE

## 1. Executive Summary
Deeptha Naturals is an enterprise-grade Digital Commerce Ecosystem & Operating System built for a premium natural/traditional food and wellness brand. It integrates a high-conversion D2C E-Commerce storefront with a 360° Customer CRM, AI Conversational Shopping Assistant (RAG-backed), AI Voice Agent with browser-native real-time testing & tool calls, WhatsApp & Email Automation, Abandoned Cart & Reorder Engines, and a comprehensive Admin Operating System.

---

## 2. System Topology

```
                     ┌──────────────────────────────────────────────┐
                     │          CUSTOMER / ADMIN INTERFACE          │
                     │          (Next.js / React 19 + Tailwind)     │
                     └──────────────────────┬───────────────────────┘
                                            │
                                  HTTPS / REST / WebSockets
                                            │
                     ┌──────────────────────▼───────────────────────┐
                     │          EXPRESS / API GATEWAY LAYER         │
                     │       (/api/v1/* Routes, Auth Middleware)    │
                     └──────┬───────────────┬────────────────┬──────┘
                            │               │                │
            ┌───────────────▼───┐   ┌───────▼────────┐   ┌───▼──────────────┐
            │ AI & Voice Gateway│   │ CRM & Workflow │   │ Commerce Engine  │
            │ (Gemini 3.6 Flash │   │ Engine         │   │ (Products, Cart, │
            │  + Tools / RAG)   │   │ (Automations)  │   │  Orders, Pay)    │
            └───────────────┬───┘   └───────┬────────┘   └───┬──────────────┘
                            │               │                │
                     ┌──────▼───────────────▼────────────────▼──────┐
                     │          PROVIDER ABSTRACTION LAYER          │
                     │  (Payments, Telephony, WhatsApp, Email, S3)  │
                     └──────────────────────┬───────────────────────┘
                                            │
                     ┌──────────────────────▼───────────────────────┐
                     │         DATA & PERSISTENCE LAYER             │
                     │    (MongoDB Store / Atlas Vector Search)     │
                     └──────────────────────────────────────────────┘
```

---

## 3. Technology Stack

- **Frontend Framework**: React 19, Vite, TypeScript, Tailwind CSS, Lucide React, Framer Motion
- **Backend API Server**: Node.js Express, TypeScript, REST API (`/api/v1/*`), WebSockets
- **AI Engine**: `@google/genai` SDK using `gemini-3.6-flash` with Function Calling & RAG Grounding
- **Voice AI Engine**: Browser WebRTC/AudioContext + Gemini Function Calling Tool Layer (`search_products`, `get_product_price`, `add_to_cart`, `get_order_status`, `create_lead`, `handoff_to_human`, `schedule_callback`)
- **Data Architecture**: MongoDB Collection Schema models (Users, Products, Categories, Orders, Cart, Customers 360, Voice Calls, Transcripts, CRM Activities, Automations, Reviews, Analytics)
- **Theme System**: Light Premium D2C Natural Luxury (Warm White `#FAF9F6`, Ivory `#F5F2EB`, Botanical Green `#2E5B38`, Earth Gold `#D4AF37`)

---

## 4. Provider Abstractions

To ensure zero lock-in and seamless transition between local `DEMO_MODE=true` and production:
1. `PaymentProvider` -> `MockPaymentProvider` / `RazorpayPaymentProvider`
2. `TelephonyProvider` -> `BrowserVoiceProvider` / `MockTelephonyProvider` / `ProductionTelephonyProvider`
3. `WhatsAppProvider` -> `MockWhatsAppProvider` / `MetaWhatsAppBusinessProvider`
4. `EmailProvider` -> `MockEmailProvider` / `ResendSMTPProvider`
5. `StorageProvider` -> `MockS3StorageProvider` / `AWS_S3_Provider`

---

## 5. Security & Governance

- Role-Based Access Control (RBAC): `SUPER_ADMIN`, `ADMIN`, `MANAGER`, `SALES_AGENT`, `SUPPORT_AGENT`, `MARKETING_MANAGER`, `CONTENT_MANAGER`, `CUSTOMER`
- Data Encryption & Privacy: Customer verification required for Voice order lookup; passwords hashed securely; HTTP-only cookies/JWT strategy.
- Product Claims Governance: AI guardrails prevent unapproved health claims or price hallucinations. All AI answers are grounded in catalogue data.
