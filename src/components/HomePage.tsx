// File: page.tsx
'use client';

import { useState, useEffect } from 'react';
// import Image, { StaticImageData } from 'react/image';
import { motion } from 'framer-motion';
// import Link from 'next/link';
import Imge1 from '../assets/dress-2.jpg'
// import Imge2 from '../assets/dress-2.jpg'
import Imge3 from '../assets/tops-1.jpg'
import Imge4 from '../assets/tops-2.jpg'
import Imge5 from '../assets/buttoms.jpg'
import Imge6 from '../assets/outerwear-1.jpg'
import Imge7 from '../assets/outerwear-2.jpg'

// Product type definition
type Product = {
  id: number;
  name: string;
  price: number;
  image: String;
  category: string;
  isNew: boolean;
  discount?: number;
  rating: number;
  description: string;
};

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 59.99,
    image: Imge4 ,
    category: "dresses",
    isNew: true,
    rating: 4.5,
    description: "A beautiful floral summer dress perfect for sunny days. Made with light breathable cotton fabric with a modern cut."
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    price: 129.99,
    image:Imge6,
    category: "dresses",
    isNew: false,
    discount: 15,
    rating: 5.0,
    description: "Stunning evening gown for special occasions. Features a fitted silhouette with delicate embellishments."
  },
  {
    id: 3,
    name: "Casual Denim Jacket",
    price: 79.99,
    image: Imge3,
    category: "outerwear",
    isNew: false,
    rating: 4.0,
    description: "Classic denim jacket that pairs well with any outfit. Features comfortable fit and durable construction."
  },
  {
    id: 4,
    name: "Silk Blouse",
    price: 49.99,
    image: Imge4,
    category: "tops",
    isNew: true,
    rating: 4.8,
    description: "Luxurious silk blouse with a relaxed fit. Perfect for both casual and formal occasions."
  },
  {
    id: 5,
    name: "High-Waisted Jeans",
    price: 69.99,
    image: Imge5,
    category: "bottoms",
    isNew: false,
    rating: 4.2,
    description: "Flattering high-waisted jeans with a perfect stretch. Designed for comfort and style."
  },
  {
    id: 6,
    name: "Bohemian Maxi Skirt",
    price: 45.99,
    image: Imge6,
    category: "bottoms",
    isNew: true,
    rating: 4.7,
    description: "Flowy bohemian maxi skirt with colorful patterns. Ideal for summer outings and beach vacations."
  },
  {
    id: 7,
    name: "Classic Trench Coat",
    price: 149.99,
    image: Imge7,
    category: "outerwear",
    isNew: false,
    discount: 20,
    rating: 4.9,
    description: "Timeless trench coat that never goes out of style. Water-resistant and perfect for transitional weather."
  },
  {
    id: 8,
    name: "Lace Evening Top",
    price: 39.99,
    image: Imge1,
    category: "tops",
    isNew: true,
    rating: 4.4,
    description: "Elegant lace top perfect for evening events. Features intricate detailing and semi-sheer design."
  },
];

// Filter options
const categories = ["all", "dresses", "tops", "bottoms", "outerwear"];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNewArrivals, setShowNewArrivals] = useState<boolean>(false);
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Filter products based on new arrivals toggle
  useEffect(() => {
    if (showNewArrivals) {
      setFilteredProducts(products.filter(product => product.isNew));
    } else {
      if (selectedCategory === "all") {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter(product => product.category === selectedCategory));
      }
    }
  }, [showNewArrivals, selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Handle add to cart
  const addToCart = (productId: number) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
  };

  // Handle toggle favorite
  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Get total items in cart
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Generate star rating display
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fillOpacity="0.5" />
        </svg>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    
    return stars;
  };

  // Show product details
  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Close product modal
  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-pink-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Cart Button (Fixed) */}
      <div className="fixed top-6 right-6 z-50 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white p-3 rounded-full shadow-lg text-pink-600 relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {getTotalCartItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalCartItems()}
            </span>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white p-3 rounded-full shadow-lg text-pink-600 relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-pink-300 opacity-30"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
        >
            
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">
            Salma.Store
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4 ">
          Elegant Styles For Modern Women
          </h1>
          <p className="text-lg md:text-xl text-pink-700 mb-8 max-w-xl">
          the latest fashion trends with our premium selection of women&apos;s clothing
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-pink-800 mb-4 md:mb-0"
            >
              Our Collection
            </motion.h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex items-center mr-6">
                <input
                  type="checkbox"
                  id="newArrivals"
                  checked={showNewArrivals}
                  onChange={() => setShowNewArrivals(!showNewArrivals)}
                  className="mr-2 h-4 w-4 accent-pink-500"
                />
                <label htmlFor="newArrivals" className="text-pink-700">
                  New Arrivals
                </label>
              </div>
              
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition duration-300 ${
                    selectedCategory === category
                      ? "bg-pink-600 text-white"
                      : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div 
                  className="relative cursor-pointer"
                  onClick={() => viewProductDetails(product)}
                >
                  <div className="h-64 w-full overflow-hidden">
                  <img
    src={product.image}
    alt={product.name}
  className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
  width={400}
  height={600}
/>

                  </div>
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-pink-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.discount}% OFF
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className={`absolute bottom-4 right-4 p-2 rounded-full ${
                      favorites.includes(product.id) 
                        ? "bg-pink-600 text-white" 
                        : "bg-white text-pink-600"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={favorites.includes(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-pink-900 cursor-pointer hover:text-pink-600" onClick={() => viewProductDetails(product)}>
                      {product.name}
                    </h3>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center mb-2">
                    {renderRatingStars(product.rating)}
                    <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
                  </div>
                  
                  <p className="text-pink-700 font-bold mb-3">
                    {product.discount ? (
                      <>
                        <span className="line-through text-pink-400 mr-2">
                          ${product.price.toFixed(2)}
                        </span>
                        <span>
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition duration-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 px-4 md:px-8 bg-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-pink-700 mb-6">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1 max-w-md"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Free Shipping</h3>
              <p className="text-pink-700">On all orders over $50</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Quality Guarantee</h3>
              <p className="text-pink-700">30-day money back guarantee</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">24/7 Support</h3>
              <p className="text-pink-700">We&apos;re here to help anytime</p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <button 
                onClick={closeProductModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="h-96 relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="object-cover w-full h-full"
                    width={600}
                    height={800}
                  />
                  {selectedProduct.isNew && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {selectedProduct.discount && (
                    <div className="absolute top-4 right-4 bg-pink-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {selectedProduct.discount}% OFF
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <h2 className="text-2xl font-bold text-pink-900 mb-2">{selectedProduct.name}</h2>
                
                <div className="flex items-center mb-3">
                  {renderRatingStars(selectedProduct.rating)}
                  <span className="ml-2 text-gray-500">({selectedProduct.rating} stars)</span>
                </div>
                
                <div className="mb-4">
                  {selectedProduct.discount ? (
                    <div className="flex items-center">
                      <span className="line-through text-gray-400 mr-2">
                        ${selectedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-2xl font-bold text-pink-700">
                        ${(selectedProduct.price * (1 - selectedProduct.discount / 100)).toFixed(2)}
                      </span>
                      <span className="ml-2 bg-pink-100 text-pink-700 px-2 py-1 rounded text-sm">
                        Save {selectedProduct.discount}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-pink-700">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-pink-900 mb-2">Size</h3>
                  <div className="flex gap-2">
                    {["XS", "S", "M", "L", "XL"].map(size => (
                      <button key={size} className="w-10 h-10 rounded-full border border-pink-300 flex items-center justify-center hover:bg-pink-100 transition-colors">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-pink-900 mb-2">Quantity</h3>
                  <div className="flex items-center">
                  {/* // File: page.tsx continued from previous message */}

<button className="w-10 h-10 rounded-l-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center">
  -
</button>
<div className="w-16 h-10 bg-white border-t border-b border-pink-200 flex items-center justify-center">
  1
</div>
<button className="w-10 h-10 rounded-r-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center">
  +
</button>
</div>
</div>

<div className="flex gap-4">
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={() => {
  addToCart(selectedProduct.id);
  closeProductModal();
}}
className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full transition duration-300 flex items-center justify-center"
>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
</svg>
Add to Cart
</motion.button>

<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={() => toggleFavorite(selectedProduct.id)}
className={`p-3 rounded-full border ${
  favorites.includes(selectedProduct.id) 
    ? "bg-pink-600 text-white border-pink-600" 
    : "bg-white text-pink-600 border-pink-300"
}`}
>
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={favorites.includes(selectedProduct.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>
</motion.button>
</div>

<div className="mt-6 pt-6 border-t border-gray-200">
<div className="flex items-center text-sm text-gray-600 mb-2">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
</svg>
Free shipping on orders over $50
</div>
<div className="flex items-center text-sm text-gray-600">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
</svg>
30-day easy returns
</div>
</div>
</div>
</div>
</motion.div>
</div>
)}
</div>
);
}