import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Truck, AlertCircle, ShoppingBag } from 'lucide-react';
import { SHIPPING_METHODS } from '../data/products';

export default function Checkout({
  cart,
  shippingMethod,
  setShippingMethod,
  discountAmount,
  discountCode,
  applyPromoCode,
  promoMessage,
  onPlaceOrder,
  onBackToCart,
  lang
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Cambodia'
  });

  const [errors, setErrors] = useState({});
  const [promoInput, setPromoInput] = useState(discountCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = shippingMethod ? shippingMethod.price : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return !value.trim() ? (lang === 'kh' ? 'សូមបញ្ចូលនាមខ្លួន (First name)' : 'First name is required') : '';
      case 'lastName':
        return !value.trim() ? (lang === 'kh' ? 'សូមបញ្ចូលនាមត្រកូល (Last name)' : 'Last name is required') : '';
      case 'email':
        if (!value.trim()) return lang === 'kh' ? 'សូមបញ្ចូលអ៊ីមែល (Email)' : 'Email address is required';
        if (!/\S+@\S+\.\S+/.test(value)) return lang === 'kh' ? 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ' : 'Invalid email format';
        return '';
      case 'phone':
        if (!value.trim()) return lang === 'kh' ? 'សូមបញ្ចូលលេខទូរស័ព្ទ (Phone)' : 'Phone number is required';
        if (value.trim().length < 8) return lang === 'kh' ? 'លេខទូរស័ព្ទយ៉ាងហោច ៨ ខ្ទង់' : 'Phone number is too short';
        return '';
      case 'address':
        return !value.trim() ? (lang === 'kh' ? 'សូមបញ្ចូលអាសយដ្ឋាន (Address)' : 'Address is required') : '';
      case 'city':
        return !value.trim() ? (lang === 'kh' ? 'សូមបញ្ចូលទីក្រុង/ខេត្ត (City)' : 'City is required') : '';
      case 'zipCode':
        return !value.trim() ? (lang === 'kh' ? 'សូមបញ្ចូលលេខកូដប្រៃសណីយ៍ (Zip code)' : 'Zip code is required') : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all required fields (Requirement 6: Validate Required Fields)
    const newErrors = {};
    const fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'];
    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top of form
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder({
        customer: formData,
        cart,
        subtotal,
        shippingFee,
        shippingMethod,
        discountAmount,
        grandTotal
      });
    }, 600);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    applyPromoCode(promoInput);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No items to checkout</h2>
        <p className="text-sm text-gray-500 mb-6">Please add some products to your cart before proceeding to checkout.</p>
        <button
          onClick={onBackToCart}
          className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb matching mockup: Cart > Shipping > Payment */}
      <nav className="flex items-center space-x-2 text-xs font-medium text-gray-500 mb-6">
        <button onClick={onBackToCart} className="hover:text-black transition">
          {lang === 'kh' ? 'កន្ត្រកទំនិញ (Cart)' : 'Cart'}
        </button>
        <span>›</span>
        <span className="text-black font-semibold">
          {lang === 'kh' ? 'ព័ត៌មានដឹកជញ្ជូន (Shipping)' : 'Shipping'}
        </span>
        <span>›</span>
        <span className="text-gray-400">
          {lang === 'kh' ? 'បញ្ជាក់ការបញ្ជាទិញ (Confirmation)' : 'Payment / Confirmation'}
        </span>
      </nav>

      {/* Main Grid: Form on left, Summary on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmit} noValidate>
            {/* Customer Details Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {lang === 'kh' ? 'ព័ត៌មានអតិថិជន និងអាសយដ្ឋានដឹកជញ្ជូន' : 'Shipping Address'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'kh'
                      ? 'បំពេញព័ត៌មានអតិថិជនខាងក្រោម (Customer Data Fields 1-6)'
                      : 'Please provide customer details for delivery'}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                  * Required
                </span>
              </div>

              {/* Form error notification */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <span className="font-bold">
                      {lang === 'kh'
                        ? 'សូមបំពេញព័ត៌មានចាំបាច់ទាំងអស់ (Validate Required Fields)៖'
                        : 'Please fix the required fields before submitting:'}
                    </span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-red-600">
                      {Object.values(errors).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* 1 & 2: First Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'នាមខ្លួន (First Name)*' : 'First Name*'}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. John"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                        errors.firstName
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-black'
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'នាមត្រកូល (Last Name)*' : 'Last Name*'}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Doe"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                        errors.lastName
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-black'
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* 3 & 4: Email & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'អ៊ីមែល (Email)*' : 'Email Address*'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                        errors.email
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-black'
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'លេខទូរស័ព្ទ (Phone Number)*' : 'Phone Number*'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+855 12 345 678"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-black'
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* 5: Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'kh' ? 'អាសយដ្ឋាន (Street Address)*' : 'Street Address / Description*'}
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No, Street name, Sangkat / Village..."
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.address
                        ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-black'
                    } focus:outline-none focus:ring-2`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City, State & Zip Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'ទីក្រុង/រាជធានី (City)*' : 'City*'}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Phnom Penh"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                        errors.city
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-black'
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'ខេត្ត/រដ្ឋ (State/Province)' : 'State / Province'}
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-black focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'លេខកូដប្រៃសណីយ៍ (Zip Code)*' : 'Zip Code*'}
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="12000"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                        errors.zipCode
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-black'
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.zipCode && (
                      <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Shipping Method Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {lang === 'kh' ? 'វិធីសាស្ត្រដឹកជញ្ជូន (Shipping Method)' : 'Shipping Method'}
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                {lang === 'kh'
                  ? 'ជ្រើសរើសជម្រើសនៃការដឹកជញ្ជូនដែលអ្នកពេញចិត្ត'
                  : 'Select your preferred delivery speed and courier'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SHIPPING_METHODS.map((method) => {
                  const isSelected = shippingMethod.id === method.id;
                  return (
                    <label
                      key={method.id}
                      onClick={() => setShippingMethod(method)}
                      className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                        isSelected
                          ? 'border-black bg-gray-50/60 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-black' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{method.name}</div>
                          <div className="text-xs text-gray-500">{method.deliveryTime}</div>
                        </div>
                      </div>
                      <div className="text-base font-bold text-gray-900">
                        {method.price === 0 ? '$0' : `$${method.price}`}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </form>
        </div>

        {/* Right Order Summary & Place Order Button (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>{lang === 'kh' ? 'ទំនិញរបស់អ្នក (Your Cart)' : 'Your Cart'}</span>
              <span className="text-xs text-gray-400 font-normal">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </h3>

            {/* Compact Cart Item List */}
            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto mb-4 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-gray-500">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Code Form */}
            <form onSubmit={handleApplyPromo} className="mb-4 pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Discount code"
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p
                  className={`text-[11px] mt-1.5 ${
                    promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs pt-3 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>{lang === 'kh' ? 'តម្លៃរង (Subtotal)' : 'Subtotal'}</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>{lang === 'kh' ? 'សេវាដឹកជញ្ជូន (Shipping)' : 'Shipping'}</span>
                <span className="font-semibold text-gray-900">
                  {shippingFee === 0 ? '$0' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>{lang === 'kh' ? 'បញ្ចុះតម្លៃ (Discount)' : 'Discount'}</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">
                  {lang === 'kh' ? 'សរុបរួម (Grand Total)' : 'Total'}
                </span>
                <span className="text-xl font-black text-gray-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* 10. Place Order Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full mt-6 py-3.5 px-4 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Processing Order...
                </span>
              ) : (
                <span>
                  {lang === 'kh' ? 'បញ្ជាទិញឥឡូវនេះ (Place Order)' : 'Place Order'}
                </span>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted 256-Bit Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
