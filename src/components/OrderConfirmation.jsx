import React from 'react';
import { CheckCircle, Clock, Package, Printer, ArrowRight, User, Calendar, Hash, DollarSign, MapPin, Truck } from 'lucide-react';

export default function OrderConfirmation({ order, onContinueShopping, onViewERD, lang }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const customerFullName = `${order.customer.firstName} ${order.customer.lastName}`;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Success Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 mb-8 text-center shadow-xs">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {lang === 'kh' ? 'ការបញ្ជាទិញទទួលបានជោគជ័យ!' : 'Order Placed Successfully!'}
        </h1>
        <p className="text-emerald-800 text-sm mt-1 max-w-md mx-auto">
          {lang === 'kh'
            ? 'សូមអរគុណសម្រាប់ការទិញទំនិញ! ការបញ្ជាទិញរបស់អ្នកត្រូវបានកត់ត្រាក្នុងប្រព័ន្ធរួចរាល់ហើយ។'
            : 'Thank you for your purchase! Your order has been registered and is being processed.'}
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        {/* Order Header / Summary Meta */}
        <div className="bg-gray-50/70 p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* 1. Order ID */}
            <div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                <span>Order ID</span>
              </div>
              <div className="text-base font-extrabold text-gray-900 mt-1 font-mono">
                {order.orderId}
              </div>
            </div>

            {/* 2. Customer Name */}
            <div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>Customer Name</span>
              </div>
              <div className="text-sm font-bold text-gray-900 mt-1 truncate">
                {customerFullName}
              </div>
            </div>

            {/* 3. Order Date */}
            <div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Order Date</span>
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1">
                {order.orderDate}
              </div>
            </div>

            {/* 4. Order Status */}
            <div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Order Status</span>
              </div>
              <div className="mt-1">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
                  {order.status || 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Summary details */}
        <div className="p-6 border-b border-gray-100 bg-white grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-gray-800">Delivery Address:</span>
              <p className="mt-0.5 text-gray-600">
                {order.customer.address}, {order.customer.city}, {order.customer.zipCode}
              </p>
              <p className="text-gray-500">
                Contact: {order.customer.phone} • {order.customer.email}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Truck className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-gray-800">Shipping Method:</span>
              <p className="mt-0.5 text-gray-600">
                {order.shippingMethod.name} ({order.shippingMethod.deliveryTime})
              </p>
            </div>
          </div>
        </div>

        {/* 5. Ordered Products List */}
        <div className="p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-600" />
            <span>Ordered Products</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                  <th className="pb-3">Product</th>
                  <th className="pb-3 text-center">Unit Price</th>
                  <th className="pb-3 text-center">Quantity</th>
                  <th className="pb-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.cart.map((item) => (
                  <tr key={item.id} className="text-gray-800">
                    <td className="py-3.5 pr-4 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.category}</div>
                      </div>
                    </td>
                    <td className="py-3.5 text-center font-medium">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3.5 text-center font-semibold">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 text-right font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 6. Total Amount Calculation Box */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee:</span>
                <span className="font-semibold text-gray-900">
                  {order.shippingFee === 0 ? '$0.00 (Free)' : `$${order.shippingFee.toFixed(2)}`}
                </span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promo Discount:</span>
                  <span>-${order.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-sm">
                <span className="font-extrabold text-gray-900 uppercase">
                  {lang === 'kh' ? 'ទឹកប្រាក់សរុប (Total Amount):' : 'Total Amount:'}
                </span>
                <span className="text-2xl font-black text-gray-900">
                  ${order.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{lang === 'kh' ? 'បោះពុម្ពវិក្កយបត្រ (Print)' : 'Print Invoice'}</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={onViewERD}
            className="px-5 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>{lang === 'kh' ? 'មើលគំនូសតាង ERD Database' : 'View Database ERD'}</span>
          </button>

          <button
            onClick={onContinueShopping}
            className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            <span>{lang === 'kh' ? 'ទិញទំនិញបន្ត (Continue Shopping)' : 'Shop More Products'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
