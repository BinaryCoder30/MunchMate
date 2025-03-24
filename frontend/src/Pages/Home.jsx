import React, { lazy, Suspense, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';

// Lazy-loaded components
const HeroSection = lazy(() => import('../Components/HeroSection'));
const FeaturedRestaurants = lazy(() => import("../Components/FeaturedRestaurants")); 
const Collections = lazy(() => import("../Components/Collections")); 
const PopularLocalities = lazy(() => import("../Components/PopularLocalities"));
const Footer = lazy(() => import("../Components/Footer"));

const MunchMateHomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { icon: "🍽", name: "All" },
    { icon: "🛵", name: "Delivery" },
    { icon: "🥡", name: "Takeaway" },
    { icon: "🍱", name: "Dining" },
    { icon: "☕", name: "Café" },
    { icon: "🌙", name: "Nightlife" }
  ], []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-[#3498DB] hover:text-[#2C3E50] transition-colors duration-300">Munch</span>
                <span className="text-[#2C3E50]">Mate</span>
                <span className="animate-pulse text-[#D4AF37] ml-1">•</span>
              </h1>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { name: 'Home', icon: '🏠', path: '/' },
                { name: 'Order', icon: '🛵', path: '/order' },
                { name: 'Restaurants', icon: '🍽', path: '/restaurants' },
                { name: 'About', icon: '📃', path: '/about' }
              ].map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className="px-4 py-2 rounded-full text-gray-600 hover:text-[#3498DB] hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-48 md:w-64 px-4 py-2 rounded-full bg-white/90 border focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-gray-600 transition-all duration-300 shadow-sm"
                />
                <button className="absolute right-0 top-0 text-gray-600 hover:text-[#3498DB] p-2 rounded-full hover:bg-blue-50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </motion.div>

              {/* Cart Button */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-600 hover:text-[#3498DB] hover:bg-blue-50 rounded-full transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">2</span>
              </motion.button>

              {/* Auth Buttons */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")} 
                className="bg-[#3498DB] text-white px-6 py-2.5 rounded-full hover:bg-[#2C3E50] transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
              >
                Log in
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")} 
                className="bg-white text-[#3498DB] px-6 py-2.5 rounded-full hover:bg-[#3498DB] hover:text-white transition-all duration-300 font-medium text-sm border-2 border-[#3498DB] shadow-md hover:shadow-lg hidden md:block"
              >
                Sign up
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3498DB]"></div>
          </div>
        }>
          <HeroSection />
          <FeaturedRestaurants filters={filters} />
          <Collections />
          <PopularLocalities />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default MunchMateHomePage;
