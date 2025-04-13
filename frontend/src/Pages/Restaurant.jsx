import React, { useState, useEffect } from "react";
import { FaStar, FaClock, FaLeaf, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5000/api";

// Restaurant Card Component
const RestaurantCard = ({ restaurant, onSelect }) => (
  <div 
    onClick={() => onSelect(restaurant)} 
    className="relative bg-white border border-[#D4AF37] rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.03] transition-all duration-300 h-full w-full mx-auto cursor-pointer"
  >
    <div className="relative h-[200px] sm:h-[250px]">
      <img 
        src={restaurant.image || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg'} 
        alt={restaurant.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg';
        }}
      />
      {restaurant.isVegan && (
        <span className="absolute top-3 right-3 bg-[#3498DB] text-white text-sm px-3 py-1 rounded-full flex items-center">
          <FaLeaf className="mr-2" /> Vegan
        </span>
      )}
    </div>

    <div className="p-4 sm:p-6 bg-white flex flex-col h-[calc(100%-200px)] sm:h-[calc(100%-250px)]">
      <div className="flex-grow">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C3E50] mb-2">{restaurant.name}</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-3">{restaurant.cuisineType}</p>
        
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <div className="flex items-center text-[#D4AF37]">
            <FaStar className="mr-1 sm:mr-2" />
            <span>{restaurant.rating || 'N/A'}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center text-[#2C3E50]">
            <FaClock className="mr-1 sm:mr-2" />
            <span>{restaurant.deliveryTime || '25-35 min'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Menu Item Component
const MenuItem = ({ item, onAddToCart }) => {
  const [showQuantity, setShowQuantity] = useState(false);

  const handleAddClick = () => {
    setShowQuantity(true);
  };

  const handleQuantitySelect = (quantity) => {
    onAddToCart(item, quantity);
    setShowQuantity(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start p-4 sm:p-6 w-full mb-4 sm:mb-6 relative">
      <div className="w-full sm:w-32 h-32 flex-shrink-0 mb-4 sm:mb-0">
        <img 
          src={item.image || "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg";
          }}
        />
      </div>

      <div className="sm:ml-6 flex-grow w-full">
        <h3 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-2">{item.name}</h3>
        <p className="text-gray-500 text-base mb-3">₹{item.price}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description || 'No description available'}</p>
        
        {!showQuantity ? (
          <button
            onClick={handleAddClick}
            className="bg-[#3498DB] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#2C3E50] transition duration-300 text-sm sm:text-base font-semibold"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex gap-2 sm:gap-3">
            {[1, 2, 4].map((qty) => (
              <button
                key={qty}
                onClick={() => handleQuantitySelect(qty)}
                className="bg-[#3498DB] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-[#2C3E50] transition duration-300 text-sm sm:text-base font-semibold"
              >
                {qty}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Restaurant View Component
const RestaurantView = ({ restaurant, onAddToCart, onBack }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [headerImage, setHeaderImage] = useState(restaurant.coverImage || restaurant.image);

  useEffect(() => {
    const img = new Image();
    img.src = restaurant.coverImage || restaurant.image || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg';
    img.onload = () => {
      setImageLoaded(true);
      setHeaderImage(img.src);
    };
    img.onerror = () => {
      setHeaderImage('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg');
      setImageLoaded(true);
    };
  }, [restaurant]);

  const categories = [...new Set(restaurant.menu.map(item => item.category))];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="relative h-[240px] sm:h-[340px]">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        )}

        <div 
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative h-full p-4 sm:p-8 flex flex-col justify-between z-10">
          <button
            onClick={onBack}
            className="w-fit px-4 py-2 sm:px-6 sm:py-3 bg-white/90 text-[#2C3E50] rounded-lg hover:bg-white transition-all duration-300 flex items-center gap-3"
          >
            <FaArrowLeft /> Back
          </button>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">{restaurant.name}</h1>
            <p className="text-gray-100 text-sm sm:text-base mb-5 max-w-2xl">{restaurant.location}</p>
            <div className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base">
              <span className="text-white flex items-center gap-2 bg-black/30 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <FaStar className="text-[#D4AF37]" /> {restaurant.rating || 'N/A'}
              </span>
              <span className="text-white flex items-center gap-2 bg-black/30 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <FaClock /> {restaurant.deliveryTime || '25-35 min'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-4 sm:mb-5 border-b-2 border-[#D4AF37] pb-2 sm:pb-3">
                {category}
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {restaurant.menu
                  .filter(item => item.category === category)
                  .map(item => (
                    <MenuItem key={item._id} item={item} onAddToCart={onAddToCart} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Cart Component
const Cart = ({ cart, updateQuantity, removeFromCart, onCheckout }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed bottom-20 right-2 sm:right-6 w-[calc(100%-1rem)] sm:w-[420px] bg-white rounded-xl shadow-2xl z-50 border border-gray-200">
      <div className="p-4 sm:p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C3E50] mb-4 sm:mb-5 flex justify-between items-center">
          Your Order
          <span className="text-lg sm:text-xl font-semibold">₹{totalAmount.toFixed(2)}</span>
        </h2>
        
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-6 sm:py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-3 sm:space-y-5">
            {cart.map((item) => (
              <div key={item.cartId} className="flex justify-between items-center border-b pb-3 sm:pb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img 
                    src={item.image || "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"} 
                    alt={item.name} 
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={() => updateQuantity(item.cartId, -1)}
                    className="text-gray-500 hover:text-[#3498DB] text-sm sm:text-base p-1"
                  >
                    -
                  </button>
                  <span className="text-sm sm:text-base w-6 sm:w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.cartId, 1)}
                    className="text-gray-500 hover:text-[#3498DB] text-sm sm:text-base p-1"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-gray-400 hover:text-red-500 ml-1 sm:ml-2 text-sm sm:text-base p-1"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {cart.length > 0 && (
        <div className="p-3 sm:p-5 border-t">
          <button
            onClick={onCheckout}
            className="w-full bg-[#D4AF37] text-white py-3 sm:py-4 rounded-lg hover:bg-[#C89650] transition duration-300 font-semibold text-sm sm:text-base"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, totalAmount, cart, onPaymentSuccess, restaurantID }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: Cookies.get('userID'),
          restaurantID,
          totalAmount,
          items: cart.map(item => ({ menuItemID: item._id, quantity: item.quantity })),
        }),
      });

      if (!response.ok) throw new Error('Order creation failed');

      const order = await response.json();
      
      const paymentResponse = await fetch(`${API_BASE_URL}/orders/${order._id}/payment`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentStatus: 'Completed' }),
      });

      if (!paymentResponse.ok) throw new Error('Payment failed');

      setPaymentSuccess(true);
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50]">Payment</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>
          
          {paymentSuccess ? (
            <div className="text-center py-8 sm:py-10">
              <div className="text-green-500 text-5xl sm:text-6xl mb-4 sm:mb-6">✓</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Payment Successful!</h3>
              <p className="text-gray-600 text-sm sm:text-base">Your order has been placed.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-5">Order Summary</h3>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 max-h-48 sm:max-h-56 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.cartId} className="flex justify-between text-sm sm:text-base">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 sm:pt-4 font-bold flex justify-between text-lg sm:text-xl">
                  <span>Total:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-5">Payment Method</h3>
                <div className="space-y-3 sm:space-y-5">
                  <label className="flex items-center gap-3 sm:gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#3498DB] focus:ring-[#3498DB]"
                    />
                    <span className="text-sm sm:text-base">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 sm:gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#3498DB] focus:ring-[#3498DB]"
                    />
                    <span className="text-sm sm:text-base">UPI Payment</span>
                  </label>
                  <label className="flex items-center gap-3 sm:gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#3498DB] focus:ring-[#3498DB]"
                    />
                    <span className="text-sm sm:text-base">Cash on Delivery</span>
                  </label>
                </div>
              </div>
              
              <button
                onClick={handlePayment}
                className="w-full bg-[#3498DB] text-white py-3 sm:py-4 rounded-lg hover:bg-[#2C3E50] transition duration-300 font-semibold text-sm sm:text-base"
              >
                Confirm Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Restaurant Component
const Restaurant = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cuisines = [
    { name: "All", icon: "🍽️" },
    { name: "Burger", icon: "🍔" },
    { name: "Pizza", icon: "🍕" },
    { name: "Indian", icon: "🍛" },
    { name: "Pasta", icon: "🍝" },
    { name: "Sushi", icon: "🍣" },
    { name: "Chinese", icon: "🥡" },
    { name: "Desserts", icon: "🍰" },
    { name: "Vegan", icon: "🌱" },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/restaurants/all`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const restaurantData = await response.json();

        const restaurantsWithMenus = await Promise.all(
          restaurantData.map(async (restaurant) => {
            const menuResponse = await fetch(`${API_BASE_URL}/menuItem/${restaurant._id}`, {
              credentials: 'include',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            const menuItems = await menuResponse.json();
            return { 
              ...restaurant, 
              menu: menuItems,
              hasMenuItems: menuItems && menuItems.length > 0
            };
          })
        );

        setRestaurants(restaurantsWithMenus);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [navigate]);

  const filteredRestaurants = (selectedCuisine === "All" 
    ? restaurants 
    : restaurants.filter(restaurant => 
        restaurant.cuisineType.toLowerCase().includes(selectedCuisine.toLowerCase()) ||
        (restaurant.menu && restaurant.menu.some(item => 
          item.category.toLowerCase().includes(selectedCuisine.toLowerCase())
        ))
      ).filter(restaurant => restaurant.hasMenuItems));

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const cartId = `${item._id}-${Date.now()}`;
      return [...prevCart, { ...item, quantity, cartId }];
    });
    setMessage(`${quantity} ${item.name}${quantity > 1 ? 's' : ''} added to cart!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, change) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.cartId === cartId) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const handleCheckout = () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setShowPayment(true);
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-2xl font-semibold text-[#2C3E50]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-[#2C3E50] mb-6 sm:mb-10">
          Food Delivery Restaurants
        </h1>

        {message && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-[#C89650] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-xl text-sm sm:text-base">
            {message}
          </div>
        )}

        {!selectedRestaurant && (
          <>
            <div className="flex justify-center mb-6 sm:mb-10 overflow-x-auto py-4 sm:py-6">
              <div className="inline-flex space-x-4 sm:space-x-10 px-4 sm:px-6">
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine.name}
                    onClick={() => setSelectedCuisine(cuisine.name)}
                    className={`flex flex-col items-center justify-center w-16 h-16 sm:w-28 sm:h-28 rounded-full transition-all duration-200 ${
                      selectedCuisine === cuisine.name
                        ? 'bg-[#D4AF37] text-white shadow-xl scale-110'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
                    }`}
                  >
                    <span className="text-2xl sm:text-4xl">{cuisine.icon}</span>
                    <span className="text-xs sm:text-base mt-1 sm:mt-2">{cuisine.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2C3E50]">
                Discover the best restaurants in your area
              </h1>
            </div>
          </>
        )}

        {selectedRestaurant ? (
          <RestaurantView
            restaurant={selectedRestaurant}
            onAddToCart={addToCart}
            onBack={() => setSelectedRestaurant(null)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8 lg:px-24">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <div key={restaurant._id} className="p-2">
                  <RestaurantCard
                    restaurant={restaurant}
                    onSelect={setSelectedRestaurant}
                  />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 py-10">
                {restaurants.length === 0 ? "Loading restaurants..." : "No restaurants with available menu items found"}
              </p>
            )}
          </div>
        )}

        {isCartOpen && (
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}

        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          totalAmount={totalAmount}
          cart={cart}
          onPaymentSuccess={clearCart}
          restaurantID={selectedRestaurant?._id}
        />

        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 bg-[#C89650] text-white p-3 sm:p-5 rounded-full shadow-xl hover:bg-[#A36A3D] transition duration-300 flex items-center"
        >
          <FaShoppingCart className="text-xl sm:text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs sm:text-sm rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Restaurant;