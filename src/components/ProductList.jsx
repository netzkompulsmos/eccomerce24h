import React, { useState } from 'react';
import { ShoppingCart, Check, Star, ArrowRight } from 'lucide-react';

export default function ProductList({ products, onAddToCart, onGoToCart, lang }) {
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 sm:p-10 mb-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            {lang === 'kh' ? 'លំហាត់អនុវត្តទី ១ • Practical Exercise 1' : 'Practical Exercise 1 • Products'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {lang === 'kh' ? 'បញ្ជីផលិតផលសម្រាប់ជ្រើសរើស' : 'Featured Products Catalog'}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {lang === 'kh'
              ? 'អតិថិជនម្នាក់ចង់ទិញផលិតផលដូចខាងក្រោម៖ Laptop ($650), Mouse ($15), Keyboard ($25), Monitor ($120)'
              : 'Choose items to add to your shopping cart with instant calculation of subtotal and grand total.'}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isJustAdded = addedIds[product.id];
          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold text-gray-800 px-2.5 py-1 rounded-full shadow-sm">
                  {product.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  {lang === 'kh' && (
                    <div className="text-xs text-gray-500 mb-2">{product.khmerName}</div>
                  )}
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Price and Add to Cart */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-2xl font-black text-gray-900 tracking-tight">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                      In Stock ({product.stock})
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black text-white hover:bg-gray-800 active:scale-98'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lang === 'kh' ? 'បានបញ្ចូល!' : 'Added!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>{lang === 'kh' ? 'Add to Cart' : 'Add to Cart'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating or Footer CTA to Cart */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 text-base">
            {lang === 'kh' ? 'រួចរាល់ដើម្បីពិនិត្យមើលកន្ត្រកទំនិញ?' : 'Ready to review your shopping cart?'}
          </h4>
          <p className="text-sm text-gray-500">
            {lang === 'kh'
              ? 'ចូលទៅកាន់ទំព័រ Cart ដើម្បីកែសម្រួលបរិមាណ (QTY) និងបន្តទៅការទូទាត់។'
              : 'Proceed to update quantities, view subtotal, or head to checkout.'}
          </p>
        </div>
        <button
          onClick={onGoToCart}
          className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-xl flex items-center gap-2 shadow transition cursor-pointer"
        >
          <span>{lang === 'kh' ? 'មើលកន្ត្រកទំនិញ (View Cart)' : 'View Shopping Cart'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
