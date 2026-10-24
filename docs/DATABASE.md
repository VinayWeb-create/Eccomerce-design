# DEEPTHA NATURALS - DATABASE SPECIFICATION (MongoDB Schemas)

Database: `deeptha_naturals`

## Collections Schema

1. **`users` / `roles` / `permissions`**
   - `_id`, `email`, `phone`, `passwordHash`, `role` (`SUPER_ADMIN` | `ADMIN` | `CUSTOMER` | etc.), `name`, `createdAt`, `updatedAt`

2. **`customers` / `customer_addresses` / `customer_tags`**
   - `_id`, `name`, `phone`, `email`, `lifecycleStage` (`NEW_LEAD` | `NEW_CUSTOMER` | `REPEAT_CUSTOMER` | `VIP` | `INACTIVE` | `WIN_BACK`), `totalOrders`, `totalRevenue`, `preferredCategories`, `tags`, `loyaltyPoints`, `notes`, `createdAt`

3. **`categories`**
   - `_id`, `name`, `slug`, `description`, `image`, `order`

4. **`products` & `product_variants`**
   - `_id`, `name`, `slug`, `sku`, `categoryId`, `description`, `shortDescription`, `ingredients`, `nutritionFacts`, `approvedClaims`, `usageInfo`, `images`, `price`, `comparePrice`, `variants` (`size`, `price`, `comparePrice`, `stock`, `sku`), `inStock`, `isFeatured`, `seoTitle`, `seoDescription`

5. **`carts` & `cart_items`**
   - `_id`, `customerId`, `sessionId`, `items` (`productId`, `variantId`, `quantity`, `price`), `subtotal`, `couponCode`, `discount`, `total`, `status` (`ACTIVE` | `ABANDONED` | `CHECKOUT` | `RECOVERED`), `updatedAt`

6. **`orders` & `order_items`**
   - `_id`, `orderNumber`, `customerId`, `customerName`, `customerPhone`, `customerEmail`, `shippingAddress`, `items`, `subtotal`, `tax`, `shippingFee`, `discount`, `totalAmount`, `paymentStatus` (`PENDING` | `PAID` | `FAILED` | `REFUNDED`), `orderStatus` (`PENDING` | `PROCESSING` | `PACKED` | `SHIPPED` | `OUT_FOR_DELIVERY` | `DELIVERED` | `CANCELLED`), `timeline`, `createdAt`

7. **`voice_calls` & `voice_transcripts` & `voice_actions`**
   - `_id`, `customerId`, `phone`, `direction` (`INBOUND` | `OUTBOUND`), `status`, `durationSeconds`, `language` (`en` | `te` | `hi`), `intent`, `outcome`, `aiHandled`, `humanHandoff`, `summary`, `sentiment`, `transcripts` (`speaker`, `text`, `timestamp`), `actionsTaken`, `createdAt`

8. **`crm_activities` & `leads`**
   - `_id`, `customerId`, `leadId`, `type` (`CALL` | `WHATSAPP` | `EMAIL` | `ORDER` | `CART` | `NOTE` | `SUPPORT`), `description`, `metadata`, `createdAt`

9. **`knowledge_documents` & `knowledge_chunks`**
   - `_id`, `title`, `category`, `content`, `embedding`, `approvalStatus` (`APPROVED` | `DRAFT`)

10. **`whatsapp_messages` & `email_messages` & `automation_workflows`**
    - `_id`, `triggerEvent`, `action`, `recipient`, `content`, `status` (`SENT` | `DELIVERED` | `READ` | `FAILED`), `createdAt`

11. **`reviews`**
    - `_id`, `productId`, `customerName`, `rating`, `title`, `comment`, `status` (`PENDING` | `APPROVED`), `createdAt`

12. **`audit_logs` & `analytics_events`**
    - `_id`, `userId`, `action`, `resource`, `details`, `timestamp`
