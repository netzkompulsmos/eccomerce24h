import React from 'react';
import { ShoppingBag, ShoppingCart, Database, Package, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, lang, setLang }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('products')}>
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xl tracking-tighter shadow-md">
              W
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Webyansh</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                E-Commerce
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>{lang === 'kh' ? 'ផលិតផល' : 'Products'}</span>
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 relative ${
                activeTab === 'cart'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'kh' ? 'កន្ត្រកទំនិញ' : 'Cart'}</span>
              {cartCount > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === 'cart' ? 'bg-red-500 text-white' : 'bg-black text-white'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('checkout')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'checkout'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{lang === 'kh' ? 'ទូទាត់ប្រាក់' : 'Checkout'}</span>
            </button>

            <button
              onClick={() => setActiveTab('erd')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'erd'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-600 hover:bg-indigo-50 border border-indigo-200'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>{lang === 'kh' ? 'គំនូសតាង ERD' : 'Database ERD'}</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-semibold uppercase">
                Task 4
              </span>
            </button>
          </nav>

          {/* Right Action: Language toggle & Quick Cart Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'kh' : 'en')}
              className="px-2.5 py-1 text-xs font-semibold rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700 transition"
              title="Toggle Khmer / English"
            >
              {lang === 'en' ? '🇰🇭 ភាសាខ្មែរ' : '🇺🇸 English'}
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-gray-100 bg-white">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex flex-col items-center text-xs py-1 px-3 ${
            activeTab === 'products' ? 'text-black font-semibold' : 'text-gray-500'
          }`}
        >
          <Package className="w-4 h-4 mb-0.5" />
          <span>Products</span>
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center text-xs py-1 px-3 relative ${
            activeTab === 'cart' ? 'text-black font-semibold' : 'text-gray-500'
          }`}
        >
          <ShoppingCart className="w-4 h-4 mb-0.5" />
          <span>Cart ({cartCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('checkout')}
          className={`flex flex-col items-center text-xs py-1 px-3 ${
            activeTab === 'checkout' ? 'text-black font-semibold' : 'text-gray-500'
          }`}
        >
          <ShoppingBag className="w-4 h-4 mb-0.5" />
          <span>Checkout</span>
        </button>
        <button
          onClick={() => setActiveTab('erd')}
          className={`flex flex-col items-center text-xs py-1 px-3 ${
            activeTab === 'erd' ? 'text-indigo-600 font-semibold' : 'text-gray-500'
          }`}
        >
          <Database className="w-4 h-4 mb-0.5" />
          <span>ERD Diagram</span>
        </button>
      </div>
    </header>
  );
}
