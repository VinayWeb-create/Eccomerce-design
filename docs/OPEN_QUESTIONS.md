# DEEPTHA NATURALS - OPEN QUESTIONS & BUSINESS CONFIRMATIONS

This document tracks items requiring business confirmation from Deeptha Naturals administrators. Everything currently missing or ambiguous in the catalogue has been set with safe defaults or flagged for confirmation.

## Items Pending Admin Confirmation

1. **Ghee Products**:
   - *Confirmed in Catalogue*: A2 Vedic Cow Ghee (200ml @ ₹600, 500ml @ ₹1400), Buffalo Ghee (500ml @ ₹750).
   - *Pending*: Additional jar sizes for Buffalo Ghee (e.g., 200ml, 1Ltr). Currently set `requiresConfirmation: true`.

2. **Snacks & Roasted Items**:
   - *Confirmed in Catalogue*: Dry Fruit Masala Trail Mix (250g @ ₹450, 500g @ ₹850, 1kg @ ₹1700); Roasted Items (Corn Puffs 100g @ ₹90, Peanut Bomb 100g @ ₹90, Peanut BBQ 100g @ ₹95, Ragi Mixture 100g @ ₹100, Flaxseed Nacho 100g @ ₹90).
   - *Pending*: Bulk family packs (500g/1kg) for Roasted Snacks. Marked for admin confirmation.

3. **Telephony & WhatsApp Credentials**:
   - Currently operating in `DEMO_MODE=true` with WebRTC Browser Voice and Mock WhatsApp API.
   - *Pending*: Twilio / Exotel / Meta WhatsApp Business API Key configuration for direct production telephony integration.

4. **Razorpay Merchant Key**:
   - Currently using `MockPaymentProvider` in demo mode with full simulation of Razorpay payment popups and webhook updates.
   - *Pending*: Production Razorpay Key ID & Key Secret in `.env`.
