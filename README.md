# E-Commerce Web Application (React.js)

Project built according to the specifications in `លំហាត់អនុវត្ត.pdf` (Practical Exercise).

## Features Implemented

### 1. Practical Exercise 1: Products & Shopping Cart
- Displays all 4 required products:
  1. **Laptop** — `$650`
  2. **Mouse** — `$15`
  3. **Keyboard** — `$25`
  4. **Monitor** — `$120`
- **Add to Cart** button with active feedback and live cart counter badge.
- **Shopping Cart Page**:
  - View Cart with thumbnails, prices, and line subtotals.
  - **Update QTY**: Increase or decrease quantities seamlessly.
  - **Remove QTY**: Delete items with confirmation.
  - **Calculate Subtotal & Grand Total**: Real-time totals with optional promo codes (e.g. `SAVE10`, `PROMO20`).
  - **Proceed to Checkout** button.

### 2. Practical Exercise 2: Checkout Form
- Customer data store & collection:
  - First Name *
  - Last Name *
  - Email *
  - Phone Number *
  - Address * (Street address, City, Zip Code)
- **Validation**: Strict validation for all required fields with inline alerts.
- **Shipping Method**: Selectable radio options (Free Shipping `$0` vs Express Shipping `$9`).
- **Order Summary**: Real-time summary breakdown with total calculations.
- **Place Order** button.

### 3. Practical Exercise 3: Order Confirmation
- Success message: **"Order Placed Successfully!"**
- **Order ID**: Formatted sequentially (`ORD-0001`, `ORD-0002`...).
- **Customer Name**: Displays the full name entered during checkout.
- **Order Date**: Current date & timestamp.
- **Ordered Products**: Table breakdown of all purchased items with images, unit price, quantity, and subtotal.
- **Total Amount**: Grand total including shipping fee and discounts.
- **Order Status**: **"Pending"** badge.
- Additional actions: Print invoice, continue shopping, and view Database ERD.

### 4. Practical Exercise 4: Database Design (ERD)
- Interactive ERD viewer inside the web app displaying the 5 required tables:
  1. `Customers`
  2. `Categories`
  3. `Products`
  4. `Orders`
  5. `Order_Items`
- Includes Primary Keys (PK), Foreign Keys (FK), column data types, relationships descriptions, and an exportable SQL schema (`DATABASE_ERD.md`).

---

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```
