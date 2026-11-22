import React, { useState } from 'react';
import { Database, Key, Link2, Copy, Check, Table, Code, Layers, FileText } from 'lucide-react';

export default function DatabaseERD({ orders = [], currentOrder, lang }) {
  const [activeView, setActiveView] = useState('diagram');
  const [copied, setCopied] = useState(false);

  const tables = [
    {
      name: 'Customers',
      khmerDesc: 'តារាងព័ត៌មានអតិថិជន',
      desc: 'Stores customer profile & contact details',
      color: 'blue',
      columns: [
        { name: 'customer_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
        { name: 'first_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'First name' },
        { name: 'last_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Last name' },
        { name: 'email', type: 'VARCHAR(150)', isPK: false, isFK: false, desc: 'Unique customer email' },
        { name: 'phone_number', type: 'VARCHAR(30)', isPK: false, isFK: false, desc: 'Contact phone' },
        { name: 'address', type: 'TEXT', isPK: false, isFK: false, desc: 'Delivery street address' },
        { name: 'city', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'City / Province' },
        { name: 'zip_code', type: 'VARCHAR(20)', isPK: false, isFK: false, desc: 'Postal zip code' },
        { name: 'created_at', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Account registration timestamp' },
      ],
    },
    {
      name: 'Categories',
      khmerDesc: 'តារាងប្រភេទទំនិញ',
      desc: 'Stores product categories',
      color: 'emerald',
      columns: [
        { name: 'category_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
        { name: 'category_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Name of the category' },
        { name: 'description', type: 'TEXT', isPK: false, isFK: false, desc: 'Category description' },
        { name: 'created_at', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Creation date' },
      ],
    },
    {
      name: 'Products',
      khmerDesc: 'តារាងផលិតផលទាំងអស់',
      desc: 'Stores catalog products & pricing',
      color: 'amber',
      columns: [
        { name: 'product_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
        { name: 'category_id', type: 'INT', isPK: false, isFK: true, ref: 'Categories.category_id', desc: 'FK -> Categories' },
        { name: 'name', type: 'VARCHAR(150)', isPK: false, isFK: false, desc: 'Laptop, Mouse, Keyboard, Monitor' },
        { name: 'price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Base unit price' },
        { name: 'stock_quantity', type: 'INT', isPK: false, isFK: false, desc: 'Available inventory' },
        { name: 'image_url', type: 'VARCHAR(255)', isPK: false, isFK: false, desc: 'Product image thumbnail' },
        { name: 'created_at', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Added timestamp' },
      ],
    },
    {
      name: 'Orders',
      khmerDesc: 'តារាងការបញ្ជាទិញ',
      desc: 'Stores order header & payment summary',
      color: 'purple',
      columns: [
        { name: 'order_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
        { name: 'customer_id', type: 'INT', isPK: false, isFK: true, ref: 'Customers.customer_id', desc: 'FK -> Customers' },
        { name: 'order_number', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'ORD-0001, ORD-0002...' },
        { name: 'order_date', type: 'DATETIME', isPK: false, isFK: false, desc: 'Timestamp of checkout' },
        { name: 'shipping_method', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Free Shipping / Express' },
        { name: 'shipping_fee', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: '$0.00 or $9.00' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Items subtotal sum' },
        { name: 'discount', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Promo code discount' },
        { name: 'total_amount', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Grand Total' },
        { name: 'order_status', type: 'VARCHAR(30)', isPK: false, isFK: false, desc: 'Pending / Completed' },
      ],
    },
    {
      name: 'Order_Items',
      khmerDesc: 'តារាងលម្អិតមុខទំនិញក្នុង Order នីមួយៗ',
      desc: 'Stores line items of each order',
      color: 'rose',
      columns: [
        { name: 'order_item_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
        { name: 'order_id', type: 'INT', isPK: false, isFK: true, ref: 'Orders.order_id', desc: 'FK -> Orders' },
        { name: 'product_id', type: 'INT', isPK: false, isFK: true, ref: 'Products.product_id', desc: 'FK -> Products' },
        { name: 'quantity', type: 'INT', isPK: false, isFK: false, desc: 'QTY purchased' },
        { name: 'unit_price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Price snapshot at purchase' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'quantity * unit_price' },
      ],
    },
  ];

  const relationships = [
    {
      from: 'Categories',
      to: 'Products',
      type: '1 : N (One-to-Many)',
      description: 'មួយ Category មាន Products ច្រើន (One Category has many Products).',
      fk: 'Products.category_id references Categories.category_id'
    },
    {
      from: 'Customers',
      to: 'Orders',
      type: '1 : N (One-to-Many)',
      description: 'អតិថិជនម្នាក់អាចធ្វើការបញ្ជាទិញច្រើនដង (One Customer places many Orders).',
      fk: 'Orders.customer_id references Customers.customer_id'
    },
    {
      from: 'Orders',
      to: 'Order_Items',
      type: '1 : N (One-to-Many)',
      description: 'ការបញ្ជាទិញមួយអាចមានច្រើនមុខទំនិញ (One Order has multiple Order Items).',
      fk: 'Order_Items.order_id references Orders.order_id'
    },
    {
      from: 'Products',
      to: 'Order_Items',
      type: '1 : N (One-to-Many)',
      description: 'ផលិតផលមួយអាចស្ថិតនៅក្នុង Order Items ជាច្រើន (One Product can appear in many Order Items).',
      fk: 'Order_Items.product_id references Products.product_id'
    },
  ];

  const sqlSchema = `-- ========================================================
-- E-Commerce Order Database Schema
-- Practical Exercise Database Design
-- Tables: Customers, Categories, Products, Orders, Order_Items
-- ========================================================

-- 1. Table: Customers
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: Categories
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: Products
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 4. Table: Orders
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    shipping_method VARCHAR(50) NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 5. Table: Order_Items
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Sample Data Seeding
INSERT INTO Categories (category_id, category_name, description) VALUES
(1, 'Computers', 'Laptops, Desktops and workstations'),
(2, 'Accessories', 'Mice, keyboards, cables and peripherals'),
(3, 'Displays', 'Monitors and high-resolution screens');

INSERT INTO Products (product_id, category_id, name, price, stock_quantity) VALUES
(1, 1, 'Laptop', 650.00, 12),
(2, 2, 'Mouse', 15.00, 45),
(3, 2, 'Keyboard', 25.00, 28),
(4, 3, 'Monitor', 120.00, 15);
`;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Title & Exercise Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>Practical Exercise Database Design • Task 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {lang === 'kh'
              ? 'គំនូសតាងទំនាក់ទំនងទិន្នន័យ (E-Commerce ERD)'
              : 'E-Commerce Order Database ERD'}
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            {lang === 'kh'
              ? 'បង្ហាញទំនាក់ទំនងរវាង Tables ទាំង ៥៖ Customers, Categories, Products, Orders, និង Order_Items តាមការណែនាំក្នុងលំហាត់អនុវត្ត។'
              : 'Entity-Relationship Diagram and SQL schema showcasing relationships between Customers, Categories, Products, Orders, and Order_Items.'}
          </p>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView('diagram')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeView === 'diagram'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Interactive ERD Diagram</span>
          </button>

          <button
            onClick={() => setActiveView('relationships')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeView === 'relationships'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Relationships Details</span>
          </button>

          <button
            onClick={() => setActiveView('sql')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeView === 'sql'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>SQL Schema DDL</span>
          </button>
        </div>

        {activeView === 'sql' && (
          <button
            onClick={handleCopySQL}
            className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
          </button>
        )}
      </div>

      {/* VIEW 1: Visual Interactive Diagram */}
      {activeView === 'diagram' && (
        <div className="space-y-8">
          {/* Visual Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tables.map((table) => {
              const borderColors = {
                blue: 'border-blue-300 ring-blue-500/20',
                emerald: 'border-emerald-300 ring-emerald-500/20',
                amber: 'border-amber-300 ring-amber-500/20',
                purple: 'border-purple-300 ring-purple-500/20',
                rose: 'border-rose-300 ring-rose-500/20',
              };
              const headerColors = {
                blue: 'bg-blue-600 text-white',
                emerald: 'bg-emerald-600 text-white',
                amber: 'bg-amber-600 text-white',
                purple: 'bg-purple-600 text-white',
                rose: 'bg-rose-600 text-white',
              };

              return (
                <div
                  key={table.name}
                  className={`bg-white rounded-2xl border-2 ${borderColors[table.color]} shadow-md overflow-hidden flex flex-col`}
                >
                  {/* Table Header */}
                  <div className={`p-4 ${headerColors[table.color]} flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                      <Table className="w-4 h-4" />
                      <span className="font-mono font-bold text-base tracking-wide">{table.name}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black/20 rounded">
                      Table
                    </span>
                  </div>

                  {/* Table Description */}
                  <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs text-gray-600">
                    <p className="font-medium text-gray-800">{table.desc}</p>
                    {lang === 'kh' && <p className="text-[11px] text-gray-500 mt-0.5">{table.khmerDesc}</p>}
                  </div>

                  {/* Columns */}
                  <div className="p-3 divide-y divide-gray-100 flex-1 text-xs">
                    {table.columns.map((col) => (
                      <div key={col.name} className="py-2 flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          {col.isPK && (
                            <span className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-800 font-mono font-bold text-[10px] rounded border border-amber-200">
                              <Key className="w-2.5 h-2.5" />
                              PK
                            </span>
                          )}
                          {col.isFK && (
                            <span className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 font-mono font-bold text-[10px] rounded border border-indigo-200">
                              <Link2 className="w-2.5 h-2.5" />
                              FK
                            </span>
                          )}
                          <span className={`font-mono font-semibold truncate ${col.isPK ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                            {col.name}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-gray-400 shrink-0">
                          {col.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Relationship Map Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-indigo-600" />
              <span>ERD Relationship Flow Diagram</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relationships.map((rel, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                  <div className="flex items-center justify-between font-mono font-bold text-sm text-gray-900 mb-1.5">
                    <span className="px-2 py-0.5 bg-white border border-gray-300 rounded text-indigo-700">
                      {rel.from}
                    </span>
                    <span className="text-gray-400 font-normal text-xs">{rel.type}</span>
                    <span className="px-2 py-0.5 bg-white border border-gray-300 rounded text-emerald-700">
                      {rel.to}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{rel.description}</p>
                  <p className="font-mono text-[11px] text-indigo-600 mt-1 bg-indigo-50/60 p-1.5 rounded">
                    ↳ {rel.fk}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Detailed Relationships & Explanations */}
      {activeView === 'relationships' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100">
            {lang === 'kh'
              ? 'ការពន្យល់លម្អិតអំពីទំនាក់ទំនងរវាង Tables ទាំង ៥'
              : 'Detailed Explanations of Table Relationships'}
          </h2>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base text-gray-900">
                  1. Categories (1) ───&lt; (N) Products
                </span>
                <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full">
                  One-to-Many
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Categories</strong> represents product classifications (e.g., Computers, Displays, Accessories). One Category can contain multiple Products, but each product belongs to one specific Category via <code>Products.category_id</code> foreign key.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base text-gray-900">
                  2. Customers (1) ───&lt; (N) Orders
                </span>
                <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full">
                  One-to-Many
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Customers</strong> contains personal details (First Name, Last Name, Email, Phone, Address). A single customer can place many orders over time. The <code>Orders.customer_id</code> foreign key links every order back to its customer.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base text-gray-900">
                  3. Orders (1) ───&lt; (N) Order_Items
                </span>
                <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full">
                  One-to-Many
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Orders</strong> stores high-level summary (Order Number, Date, Total Amount, Shipping Method, Status). Each order can have one or more specific products bought in varied quantities, tracked inside <code>Order_Items</code> via <code>Order_Items.order_id</code>.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base text-gray-900">
                  4. Products (1) ───&lt; (N) Order_Items
                </span>
                <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full">
                  One-to-Many
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                A single <strong>Product</strong> (e.g. Laptop or Mouse) can be purchased in many different customer orders. <code>Order_Items.product_id</code> references the master Product record to record the unit price and quantity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: SQL Schema */}
      {activeView === 'sql' && (
        <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 shadow-xl border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-800">
            <span className="text-xs font-mono text-gray-400">schema.sql — MySQL / PostgreSQL Compatible DDL</span>
            <button
              onClick={handleCopySQL}
              className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded font-mono transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-emerald-400 p-2">
            <code>{sqlSchema}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
