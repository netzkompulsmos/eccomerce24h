import React, { useState } from 'react';
import { Trash2, Heart, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, Tag, CheckCircle2 } from 'lucide-react';

export default function ShoppingCart({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  shippingMethod,
  discountCode,
  setDiscountCode,
  discountAmount,
  applyPromoCode,
  promoMessage,
  lang
}) {
  const [promoInput, setPromoInput] = useState(discountCode || '');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = shippingMethod ? shippingMethod.price : 0;
  const grandTotal = Math.max(0, subtotal + delivery - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    applyPromoCode(promoInput);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {lang === 'kh' ? 'កន្ត្រកទំនិញរបស់អ្នកទទេ' : 'Your cart is empty'}
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
          {lang === 'kh'
            ? 'មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ។ សូមជ្រើសរើសទំនិញពីបញ្ជីផលិតផល។'
            : 'Looks like you have not added any products to your cart yet. Check out our catalog to get started!'}
        </p>
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-medium text-sm transition shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'kh' ? 'ទៅកាន់បញ្ជីផលិតផល' : 'Explore Products'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {lang === 'kh' ? 'កន្ត្រកទំនិញ (Cart)' : 'Cart'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {lang === 'kh'
              ? `មាន ${cart.reduce((s, i) => s + i.quantity, 0)} មុខទំនិញក្នុងកន្ត្រក`
              : `${cart.reduce((s, i) => s + i.quantity, 0)} item(s) selected`}
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition cursor-pointer"
        >
          {lang === 'kh' ? 'សម្អាតកន្ត្រកទំនិញ' : 'Clear All'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (Left Side - 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:border-gray-300 transition flex flex-col sm:flex-row gap-5"
            >
              {/* Product Thumbnail */}
              <div className="w-full sm:w-36 h-36 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info & Controls */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    {lang === 'kh' && item.khmerName && (
                      <p className="text-xs text-gray-500 font-medium">{item.khmerName}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">Category: {item.category}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-gray-400">
                        ${item.price.toFixed(2)} each
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Actions & Qty Control */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                  {/* Wishlist & Remove */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-2 rounded-lg border transition cursor-pointer ${
                        favorites[item.id]
                          ? 'text-red-500 border-red-200 bg-red-50'
                          : 'text-gray-400 border-gray-200 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                      title="Save to favorites"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites[item.id] ? 'fill-red-500' : ''}`}
                      />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Controls: [-] [qty] [+] */}
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 text-gray-600 transition cursor-pointer disabled:opacity-40"
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-gray-900 select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'kh' ? 'បន្តការទិញទំនិញ (Continue Shopping)' : 'Continue Shopping'}</span>
          </button>
        </div>

        {/* Order Summary (Right Side - 4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {lang === 'kh' ? 'សង្ខេបការបញ្ជាទិញ (Order Summary)' : 'Order Summary'}
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{lang === 'kh' ? 'តម្លៃរង (Subtotal)' : 'Subtotal'}</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>{lang === 'kh' ? 'សេវាដឹកជញ្ជូន (Delivery)' : 'Delivery'}</span>
                <span className="font-semibold text-gray-900">
                  {delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{lang === 'kh' ? 'បញ្ចុះតម្លៃ (Discount)' : 'Discount'}</span>
                  </span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-900">
                  {lang === 'kh' ? 'សរុបរួម (Total)' : 'Total'}
                </span>
                <span className="text-2xl font-black text-gray-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full mt-6 py-3.5 px-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
            >
              <span>{lang === 'kh' ? 'បន្តទៅការទូទាត់ (Checkout)' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Promo Code Section */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  {lang === 'kh' ? 'បញ្ចូលកូដបញ្ចុះតម្លៃ (Promo code)' : 'User a promo code'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Try: SAVE10 or PROMO20"
                    className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-xs mt-1 ${
                      promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
