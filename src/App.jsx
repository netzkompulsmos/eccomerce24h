import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import DatabaseERD from './components/DatabaseERD';
import { INITIAL_PRODUCTS, SHIPPING_METHODS } from './data/products';

export default function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [lang, setLang] = useState('en');
  
  // Cart state: initialize with products from PDF exercise for immediate demo readiness
  const [cart, setCart] = useState([
    { ...INITIAL_PRODUCTS[0], quantity: 1 }, // Laptop $650
    { ...INITIAL_PRODUCTS[1], quantity: 1 }, // Mouse $15
  ]);

  const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  // Orders history
  const [orderCount, setOrderCount] = useState(1);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  // Update quantity handler
  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item handler
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast('Item removed from cart');
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    setDiscountAmount(0);
    setDiscountCode('');
    setPromoMessage(null);
    showToast('Cart cleared');
  };

  // Promo code apply
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setDiscountAmount(0);
      setDiscountCode('');
      setPromoMessage(null);
      return;
    }

    if (clean === 'SAVE10' || clean === 'PROMO10' || clean === 'WEB10') {
      const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const discount = Math.round(subtotal * 0.1 * 100) / 100;
      setDiscountAmount(discount);
      setDiscountCode(clean);
      setPromoMessage({ type: 'success', text: `Success! 10% discount applied (-$${discount.toFixed(2)})` });
    } else if (clean === 'SAVE20' || clean === 'PROMO20') {
      const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const discount = Math.round(subtotal * 0.2 * 100) / 100;
      setDiscountAmount(discount);
      setDiscountCode(clean);
      setPromoMessage({ type: 'success', text: `Success! 20% discount applied (-$${discount.toFixed(2)})` });
    } else {
      setDiscountAmount(0);
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try SAVE10 or PROMO20' });
    }
  };

  // Place order handler
  const handlePlaceOrder = (orderData) => {
    const formattedOrderId = `ORD-${String(orderCount).padStart(4, '0')}`;
    const newOrder = {
      ...orderData,
      orderId: formattedOrderId,
      orderDate: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'Pending',
    };

    setCurrentOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);
    setOrderCount((prev) => prev + 1);
    setCart([]); // Clear cart after order placed
    setActiveTab('confirmation');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toast}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        lang={lang}
        setLang={setLang}
      />

      {/* Page Content */}
      <main className="flex-1">
        {activeTab === 'products' && (
          <ProductList
            products={INITIAL_PRODUCTS}
            onAddToCart={handleAddToCart}
            onGoToCart={() => setActiveTab('cart')}
            lang={lang}
          />
        )}

        {activeTab === 'cart' && (
          <ShoppingCart
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => setActiveTab('checkout')}
            onContinueShopping={() => setActiveTab('products')}
            shippingMethod={shippingMethod}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            discountAmount={discountAmount}
            applyPromoCode={applyPromoCode}
            promoMessage={promoMessage}
            lang={lang}
          />
        )}

        {activeTab === 'checkout' && (
          <Checkout
            cart={cart}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            discountAmount={discountAmount}
            discountCode={discountCode}
            applyPromoCode={applyPromoCode}
            promoMessage={promoMessage}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setActiveTab('cart')}
            lang={lang}
          />
        )}

        {activeTab === 'confirmation' && (
          <OrderConfirmation
            order={currentOrder}
            onContinueShopping={() => setActiveTab('products')}
            onViewERD={() => setActiveTab('erd')}
            lang={lang}
          />
        )}

        {activeTab === 'erd' && (
          <DatabaseERD
            orders={orders}
            currentOrder={currentOrder}
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">Webyansh Store</span>
            <span>•</span>
            <span>Practical Exercise React.js Implementation</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveTab('products')} className="hover:text-black">
              1. Products
            </button>
            <button onClick={() => setActiveTab('cart')} className="hover:text-black">
              2. Cart Page
            </button>
            <button onClick={() => setActiveTab('checkout')} className="hover:text-black">
              3. Checkout
            </button>
            <button onClick={() => setActiveTab('erd')} className="hover:text-indigo-600 font-semibold">
              4. Database ERD
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
