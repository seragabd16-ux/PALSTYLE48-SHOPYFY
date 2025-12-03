
# TACTICAL DEPLOYMENT: HEADLESS SHOPIFY

This document outlines the protocol for connecting the **Palstyle48 React Frontend** to your **Shopify Backend**.

---

### PHASE 1: SHOPIFY CONFIGURATION

1.  **Access Command Center**: Log in to your Shopify Admin.
2.  **Create Custom App**:
    *   Go to **Settings** > **Apps and sales channels** > **Develop apps**.
    *   Click **Create an app**. Name it `Palstyle Headless`.
3.  **Configure API Scopes**:
    *   Click **Configure Storefront API scopes**.
    *   Select:
        *   `unauthenticated_read_product_listings`
        *   `unauthenticated_read_product_tags`
        *   `unauthenticated_write_checkouts`
    *   Click **Save**.
4.  **Retrieve Credentials**:
    *   Go to **API credentials** tab.
    *   Copy the **Storefront API access token** (NOT the Admin API token).

---

### PHASE 2: FRONTEND INTEGRATION

1.  **Environment Variables**:
    *   Open `services/shopifyService.ts`.
    *   Replace `SHOPIFY_DOMAIN` with your store domain (e.g., `palstyle48.myshopify.com`).
    *   Replace `STOREFRONT_ACCESS_TOKEN` with the token you copied in Phase 1.
    *   *Note: For production (Vercel), add these as Environment Variables.*

2.  **Data Injection**:
    *   Go to the **Admin Dashboard** in the app.
    *   Click **"Export to Shopify CSV"**.
    *   Upload this CSV to Shopify Admin > Products > Import.
    *   This populates your backend with the 10 curated "Dark Luxury" artifacts.

---

### PHASE 3: DEPLOYMENT (VERCEL)

1.  Push this code to **GitHub**.
2.  Import the repository to **Vercel**.
3.  In Vercel Project Settings, add Environment Variables:
    *   `REACT_APP_SHOPIFY_DOMAIN`
    *   `REACT_APP_SHOPIFY_STOREFRONT_TOKEN`
4.  Deploy.

---

### PHASE 4: CHECKOUT PROTOCOL

*   The current `CheckoutPage.tsx` is a high-end simulation.
*   To enable real transactions, we will use the `shopify-buy` SDK to create a checkout line item and redirect the user to the secure Shopify Web Checkout URL upon clicking "Authorize Payment".

**SYSTEM STATUS: READY FOR DEPLOYMENT**
