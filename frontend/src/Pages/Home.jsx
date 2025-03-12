import React, { lazy, Suspense, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';

// Lazy-loaded components
const HeroSection = lazy(() => import('../Components/HeroSection'));
const FeaturedRestaurants = lazy(() => import("../components/FeaturedRestaurants")); 
const Collections = lazy(() => import("../components/Collections")); 
const PopularLocalities = lazy(() => import("../components/PopularLocalities"));
const Footer = lazy(() => import("../components/Footer"));

const MunchMateHomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Optimized debounced search function
  const handleSearch = useCallback(
    debounce((query) => {
      console.log('Searching for:', query);
      // Perform search logic here
    }, 300),
    []
  );

  // Filter categories (memoized for optimization)
  const filters = useMemo(() => [
    { icon: "🍽", name: "Dining Out" },
    { icon: "🛵", name: "Delivery" },
    { icon: "🌙", name: "Nightlife" },
    { icon: "🥡", name: "Takeaway" },
    { icon: "🍱", name: "Lunch Box" },
    { icon: "☕", name: "Café" }
  ], []);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-4xl font-extrabold tracking-tight">
                <span className="text-[#3498DB] hover:text-[#2C3E50] transition-colors duration-300">Munch</span>
                <span className="text-[#2C3E50]">Mate</span>
                <span className="animate-pulse text-[#D4AF37] ml-1">•</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', icon: '🏠' },
                { name: 'Order', icon: '🛵' },
                { name: 'Takeaway', icon: '🍽' },
                { name: 'About Us', icon: '📃' }
                // { name: 'Profile', icon: '🧑‍💻' }
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="px-4 py-2 rounded-full text-gray-600 hover:text-[#3498DB] hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-48 opacity-100 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-gray-600 transition-all duration-300"
                />
                <button className="absolute right-0 top-0 text-gray-600 hover:text-[#3498DB] p-2 rounded-full hover:bg-blue-50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Cart Button */}
              <button className="relative p-2 text-gray-600 hover:text-[#3498DB] hover:bg-blue-50 rounded-full transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </button>

              {/* Auth Buttons */}
              <button onClick={() => navigate("/login")} className="bg-[#3498DB] text-white px-6 py-2.5 rounded-full hover:bg-[#2C3E50] transition-all duration-300 transform hover:scale-105 font-medium text-sm shadow-md hover:shadow-lg">
                Log in
              </button>
              <button onClick={() => navigate("/signup")} className="bg-white text-[#3498DB] px-6 py-2.5 rounded-full hover:bg-[#3498DB] hover:text-white transition-all duration-300 transform hover:scale-105 font-medium text-sm border-2 border-[#3498DB] shadow-md hover:shadow-lg">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Lazy-loaded sections */}
      <Suspense fallback={<div className="text-center py-20 text-lg font-medium text-gray-600 animate-pulse">Loading content...</div>}>
        <HeroSection />
        <FeaturedRestaurants filters={filters} />
        <Collections />
        <PopularLocalities />
        <Footer />
      </Suspense>
    </div>
  );
};

export default MunchMateHomePage;
