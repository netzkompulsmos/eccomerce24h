export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Laptop',
    khmerName: 'កុំព្យូទ័រយួរដៃ',
    price: 650,
    category: 'Computers',
    description: 'High performance laptop with 15.6" FHD display, Intel i5, 16GB RAM, 512GB SSD.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    stock: 12,
    rating: 4.8,
    reviews: 124,
    badge: 'Popular'
  },
  {
    id: 2,
    name: 'Mouse',
    khmerName: 'កណ្តុរ',
    price: 15,
    category: 'Accessories',
    description: 'Ergonomic wireless optical mouse with silent click and adjustable DPI.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    stock: 45,
    rating: 4.6,
    reviews: 89,
    badge: 'Best Seller'
  },
  {
    id: 3,
    name: 'Keyboard',
    khmerName: 'ក្តារចុច',
    price: 25,
    category: 'Accessories',
    description: 'RGB mechanical gaming keyboard with tactile switches and anti-ghosting.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    stock: 28,
    rating: 4.7,
    reviews: 73,
    badge: 'Trending'
  },
  {
    id: 4,
    name: 'Monitor',
    khmerName: 'អេក្រង់កុំព្យូទ័រ',
    price: 120,
    category: 'Displays',
    description: '27-inch IPS Ultra-Slim Full HD monitor with 100Hz refresh rate and HDMI/DP.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    stock: 15,
    rating: 4.9,
    reviews: 142,
    badge: 'Top Rated'
  }
];

export const SHIPPING_METHODS = [
  {
    id: 'free',
    name: 'Free Shipping',
    price: 0,
    deliveryTime: '7-20 Days',
    description: 'Standard delivery via national postal service'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 9,
    deliveryTime: '1-3 Days',
    description: 'Fast air shipping via DHL / FedEx'
  }
];
