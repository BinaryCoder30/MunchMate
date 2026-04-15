import React, { useEffect, lazy, Suspense, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Lazy-loaded components
const HeroSection = lazy(() => import('../Components/HeroSection'));
const FeaturedRestaurants = lazy(() => import("../Components/FeaturedRestaurants")); 
const Collections = lazy(() => import("../Components/Collections")); 
const PopularLocalities = lazy(() => import("../Components/PopularLocalities"));
const Footer = lazy(() => import("../Components/Footer"));

const API_BASE_URL = "http://localhost:5000/api";

const MunchMateHomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'login' or 'signup'

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch and filter restaurants based on search query
  const fetchRestaurants = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearchOpen(false);
        return;
      }

      try {
        const token = Cookies.get('token');
        if (!token) {
          setSearchResults([]);
          setIsSearchOpen(false);
          return;
        }

        // Fetch restaurant data as done in Restaurant component
        const response = await fetch(`${API_BASE_URL}/restaurants/all`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const restaurantData = await response.json();

        // Filter restaurants based on name or cuisineType
        const filteredResults = restaurantData.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
            restaurant.cuisineType.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredResults);
        setIsSearchOpen(true);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setSearchResults([]);
        setIsSearchOpen(false);
      }
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchRestaurants(query);
  };

  // Handle restaurant selection from search results
  const handleRestaurantSelect = async (restaurant) => {
    try {
      const token = Cookies.get('token');
      // Fetch menu items for the selected restaurant to match Restaurant component
      const menuResponse = await fetch(`${API_BASE_URL}/menuItem/${restaurant._id}`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const menuItems = await menuResponse.json();
      const restaurantWithMenu = {
        ...restaurant,
        menu: menuItems,
        hasMenuItems: menuItems && menuItems.length > 0,
      };

      setSearchQuery('');
      setSearchResults([]);
      setIsSearchOpen(false);
      navigate('/restaurant', { state: { selectedRestaurant: restaurantWithMenu } });
    } catch (error) {
      console.error('Error fetching menu items:', error);
      navigate('/restaurant');
    }
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter categories (memoized for optimization)
  const filters = useMemo(() => [
    { icon: "🍽", name: "All" },
    { icon: "🛵", name: "Delivery" },
    { icon: "🥡", name: "Takeaway" },
    { icon: "🍱", name: "Dining" },
    { icon: "☕", name: "Café" },
    { icon: "🌙", name: "Nightlife" }
  ], []);

  // Handle role selection modal
  const openRoleModal = (type) => {
    setActionType(type); // 'login' or 'signup'
    setShowRoleModal(true);
  };

  const closeRoleModal = () => {
    setShowRoleModal(false);
    setActionType(null);
  };

  const handleRoleSelection = (role) => {
    closeRoleModal();
    if (role === 'admin') {
      navigate(actionType === 'login' ? '/admin/login' : '/admin/signup');
    } else {
      navigate(actionType === 'login' ? '/login' : '/signup');
    }
  };

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

            {/* Search Bar */}
            <div className="relative search-container mx-4 flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search restaurants..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498DB] text-sm"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2 z-50 max-h-80 overflow-y-auto border border-gray-200"
                  >
                    {searchResults.map((restaurant) => (
                      <div
                        key={restaurant._id}
                        onClick={() => handleRestaurantSelect(restaurant)}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                      >
                        <img
                          src={restaurant.image || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg'}
                          alt={restaurant.name}
                          className="w-12 h-12 object-cover rounded-md"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg';
                          }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#2C3E50]">{restaurant.name}</p>
                          <p className="text-xs text-gray-500">{restaurant.cuisineType}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { name: 'Home', icon: '🏠', path: '/' },
                { name: 'Order', icon: '🛵', path: '/order' },
                { name: 'Restaurants', icon: '🍽', path: '/restaurant' },
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
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-all duration-300 font-medium text-sm shadow-md"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openRoleModal('login')} 
                      className="bg-[#3498DB] text-white px-6 py-2.5 rounded-full hover:bg-[#2C3E50] transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
                    >
                      Log in
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openRoleModal('signup')} 
                      className="bg-white text-[#3498DB] px-6 py-2.5 rounded-full hover:bg-[#3498DB] hover:text-white transition-all duration-300 font-medium text-sm border-2 border-[#3498DB] shadow-md hover:shadow-lg hidden md:block"
                    >
                      Sign up
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Role Selection Modal */}
      <AnimatePresence>
        {showRoleModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeRoleModal}
          >
            <motion.div
              className="bg-gray-900/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700/50"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Are you an Admin or a Customer?
              </h2>
              <div className="flex flex-col space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRoleSelection('admin')}
                  className="bg-indigo-800 text-white py-3 rounded-xl hover:bg-indigo-900 transition-all duration-300 font-medium shadow-md"
                >
                  Admin
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRoleSelection('customer')}
                  className="bg-purple-800 text-white py-3 rounded-xl hover:bg-purple-900 transition-all duration-300 font-medium shadow-md"
                >
                  Customer
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeRoleModal}
                className="mt-6 w-full text-gray-400 hover:text-white underline transition-colors duration-200"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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