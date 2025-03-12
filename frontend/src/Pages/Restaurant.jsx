import React, { useState, useEffect } from "react";
import { FaStar, FaClock, FaLeaf, FaFire, FaCreditCard, FaWallet, FaMoneyBill, FaPaypal } from 'react-icons/fa';

const RestaurantCard = ({ restaurant, onSelect }) => (
  <div className="relative bg-white border border-[#D4AF37] rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 h-[400px]">
    <div className="relative h-[200px]">
      <img 
        src={restaurant.image} 
        alt={restaurant.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg';
        }}
      />
      {restaurant.isVegan && (
        <span className="absolute top-2 right-2 bg-[#3498DB] text-white text-xs px-2 py-1 rounded-full">
          <FaLeaf className="inline mr-1" /> Vegan Options
        </span>
      )}
    </div>

    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-2">{restaurant.name}</h2>
      <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center text-[#D4AF37]">
          <FaStar className="mr-1" />
          <span>{restaurant.rating}</span>
        </div>
        <span className="text-gray-400">•</span>
        <div className="flex items-center text-[#2C3E50]">
          <FaClock className="mr-1" />
          <span>{restaurant.deliveryTime}</span>
        </div>
      </div>

      <button
        onClick={() => onSelect(restaurant)}
        className="w-full bg-[#3498DB] text-white py-2 rounded hover:bg-[#2C3E50] transition duration-300 mt-auto"
      >
        View Menu
      </button>
    </div>
  </div>
);

const MenuItem = ({ item, onAddToCart }) => (
  <div className="bg-white border border-[#D4AF37] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
    <div className="relative h-48">
      <img 
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg";
        }}
      />
      <div className="absolute top-2 right-2 flex gap-2">
        {item.isVegan && (
          <span className="bg-[#3498DB] text-white text-xs px-2 py-1 rounded-full">
            <FaLeaf className="inline mr-1" /> Vegan
          </span>
        )}
        {item.isSpicy && (
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            <FaFire className="inline mr-1" /> Spicy
          </span>
        )}
      </div>
    </div>

    <div className="p-4">
      <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">{item.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-[#D4AF37]">${item.price}</span>
        <button
          onClick={() => onAddToCart(item)}
          className="bg-[#3498DB] text-white px-4 py-2 rounded hover:bg-[#2C3E50] transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const RestaurantView = ({ restaurant, onAddToCart, onBack }) => {
  const categories = [...new Set(restaurant.menu.map(item => item.category))];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [headerImage, setHeaderImage] = useState(restaurant.coverImage || restaurant.image);

  // Preload the header image
  useEffect(() => {
    const img = new Image();
    img.src = restaurant.coverImage || restaurant.image;
    img.onload = () => {
      setImageLoaded(true);
      setHeaderImage(img.src);
    };
    img.onerror = () => {
      setHeaderImage('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg');
      setImageLoaded(true);
    };
  }, [restaurant]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Restaurant Header */}
      <div className="relative h-[400px]"> {/* Increased height for better visibility */}
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
            <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        )}

        {/* Background Image */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-between z-10">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-fit px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#2C3E50] transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <span>←</span> Back to Restaurants
          </button>

          {/* Restaurant Info */}
          <div className="animate-fadeIn">
            <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {restaurant.name}
            </h1>
            <p className="text-gray-100 text-lg mb-4 max-w-2xl drop-shadow-md">
              {restaurant.description}
            </p>
            <div className="flex items-center gap-6 text-lg">
              <span className="text-white flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                <FaStar className="text-[#D4AF37]" /> {restaurant.rating}
              </span>
              <span className="text-white flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                <FaClock /> {restaurant.deliveryTime}
              </span>
              {restaurant.isVegan && (
                <span className="bg-[#3498DB] text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <FaLeaf /> Vegan Options
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your CSS or Tailwind config */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* Menu Categories Section */}
      <div className="p-6 bg-[#F5F5F5]">
        {categories.map((category, index) => (
          <div 
            key={category} 
            className="mb-8 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 border-b-2 border-[#D4AF37] pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.menu
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg";
                        }}
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        {item.isVegan && (
                          <span className="bg-[#3498DB] text-white text-xs px-2 py-1 rounded-full">
                            <FaLeaf className="inline mr-1" /> Vegan
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            <FaFire className="inline mr-1" /> Spicy
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[#D4AF37]">${item.price}</span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="bg-[#3498DB] text-white px-4 py-2 rounded-lg hover:bg-[#2C3E50] transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose, totalAmount, cart }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Validate based on payment method
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv) {
        setError('Please fill in all card details');
        setIsProcessing(false);
        return;
      }
      // Add card validation logic here
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        setError('Please enter UPI ID');
        setIsProcessing(false);
        return;
      }
      // Add UPI validation logic here
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Handle successful payment
      onClose();
      // You can add success notification here
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Payment Details</h2>
        
        {/* Order Summary */}
        <div className="mb-6 p-4 bg-[#222629] rounded-lg">
          <h3 className="text-[#C89650] font-semibold mb-2">Order Summary</h3>
          <div className="text-gray-300 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>$3.50</span>
            </div>
            <div className="flex justify-between font-bold text-[#C89650] pt-2 border-t border-gray-600">
              <span>Total:</span>
              <span>${(totalAmount + 3.50).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
              paymentMethod === 'card' 
                ? 'bg-[#C89650] text-white' 
                : 'bg-[#222629] text-gray-400 hover:bg-[#2A2F33]'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <FaCreditCard size={24} />
            <span>Card</span>
          </button>
          <button
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
              paymentMethod === 'upi' 
                ? 'bg-[#C89650] text-white' 
                : 'bg-[#222629] text-gray-400 hover:bg-[#2A2F33]'
            }`}
            onClick={() => setPaymentMethod('upi')}
          >
            <FaWallet size={24} />
            <span>UPI</span>
          </button>
          <button
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
              paymentMethod === 'paypal' 
                ? 'bg-[#C89650] text-white' 
                : 'bg-[#222629] text-gray-400 hover:bg-[#2A2F33]'
            }`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <FaPaypal size={24} />
            <span>PayPal</span>
          </button>
          <button
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
              paymentMethod === 'cod' 
                ? 'bg-[#C89650] text-white' 
                : 'bg-[#222629] text-gray-400 hover:bg-[#2A2F33]'
            }`}
            onClick={() => setPaymentMethod('cod')}
          >
            <FaMoneyBill size={24} />
            <span>Cash</span>
          </button>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-4">
          {paymentMethod === 'card' && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  className="w-full bg-[#222629] text-white px-4 py-2 rounded-md border border-gray-600 focus:border-[#C89650] focus:outline-none"
                  maxLength="16"
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      setExpiryDate(
                        value
                          .replace(/(\d{2})(\d{2})/, '$1/$2')
                          .slice(0, 5)
                      );
                    }
                  }}
                  className="w-1/2 bg-[#222629] text-white px-4 py-2 rounded-md border border-gray-600 focus:border-[#C89650] focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="w-1/2 bg-[#222629] text-white px-4 py-2 rounded-md border border-gray-600 focus:border-[#C89650] focus:outline-none"
                  maxLength="3"
                />
              </div>
            </>
          )}

          {paymentMethod === 'upi' && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full bg-[#222629] text-white px-4 py-2 rounded-md border border-gray-600 focus:border-[#C89650] focus:outline-none"
            />
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-1/2 bg-[#C89650] text-white py-3 rounded-md hover:bg-[#A36A3D] transition duration-300 disabled:bg-gray-500"
            >
              {isProcessing ? 'Processing...' : `Pay $${(totalAmount + 3.50).toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add a Cart component to display cart items
const Cart = ({ cart, updateQuantity, removeFromCart, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 3.50;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="fixed bottom-4 right-4 bg-[#2F3437] p-6 rounded-lg shadow-xl border border-[#C89650] w-96">
        <h2 className="text-xl font-bold text-[#C89650] mb-4">Your Cart</h2>
        <p className="text-gray-400">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-6 rounded-lg shadow-xl border border-[#D4AF37] w-96 max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Your Cart</h2>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-[#F5F5F5] p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <h3 className="text-[#2C3E50] font-semibold">{item.name}</h3>
                <p className="text-[#D4AF37]">${item.price}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateQuantity(item.id, -1)}
                className="bg-[#3498DB] text-white w-8 h-8 rounded hover:bg-[#2C3E50]"
              >
                -
              </button>
              <span className="text-[#2C3E50] w-8 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                className="bg-[#3498DB] text-white w-8 h-8 rounded hover:bg-[#2C3E50]"
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-[#2C3E50]">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#2C3E50]">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#D4AF37] font-bold text-lg pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => onCheckout(total)}
        className="w-full bg-[#3498DB] text-white py-3 rounded-lg mt-6 hover:bg-[#2C3E50] transition duration-300"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

const Restaurant = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "The Gourmet Kitchen",
      cuisine: "Continental",
      rating: 4.5,
      deliveryTime: "30-40 min",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      coverImage: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      description: "Experience fine dining at its best with our carefully curated menu.",
      isVegan: false,
      menu: [
        {
          id: 1,
          name: "Grilled Salmon",
          price: 24.99,
          description: "Fresh salmon fillet with herbs and lemon butter sauce",
          image: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg",
          isSpicy: false,
          category: "Mains"
        },
        {
          id: 2,
          name: "Truffle Pasta",
          price: 18.99,
          description: "Handmade pasta with black truffle and parmesan",
          image: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
          isSpicy: false,
          category: "Mains"
        },
        {
          id: 3,
          name: "Caesar Salad",
          price: 12.99,
          description: "Crisp romaine lettuce with classic Caesar dressing",
          image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
          isVegan: true,
          category: "Starters"
        },
        {
          id: 4,
          name: "Beef Wellington",
          price: 34.99,
          description: "Premium beef wrapped in pastry with mushroom duxelles",
          image: "https://images.pexels.com/photos/6941017/pexels-photo-6941017.jpeg",
          category: "Specialties"
        },
        {
          id: 37,
          name: "Truffle Risotto",
          price: 28.99,
          description: "Creamy Arborio rice with black truffle and parmesan",
          image: "https://images.pexels.com/photos/6941017/pexels-photo-6941017.jpeg",
          isSpicy: false,
          category: "Mains"
        },
        {
          id: 38,
          name: "Lobster Thermidor",
          price: 42.99,
          description: "Classic French dish with lobster in rich cream sauce",
          image: "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg",
          isSpicy: false,
          category: "Specialties"
        }
      ]
    },
    {
      id: 2,
      name: "Spice Paradise",
      cuisine: "Indian",
      rating: 4.3,
      deliveryTime: "35-45 min",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      coverImage: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      description: "Authentic Indian cuisine with rich flavors and aromatic spices.",
      menu: [
        {
          id: 5,
          name: "Butter Chicken",
          price: 16.99,
          description: "Tender chicken in rich tomato-butter sauce",
          image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
          isSpicy: true,
          category: "Mains"
        },
        {
          id: 6,
          name: "Paneer Tikka",
          price: 14.99,
          description: "Grilled cottage cheese with Indian spices",
          image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
          isSpicy: true,
          isVegan: true,
          category: "Starters"
        },
        {
          id: 7,
          name: "Biryani",
          price: 19.99,
          description: "Fragrant rice dish with aromatic spices",
          image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg",
          isSpicy: true,
          category: "Mains"
        }
      ]
    },
    {
      id: 3,
      name: "Sushi Master",
      cuisine: "Japanese",
      rating: 4.7,
      deliveryTime: "25-35 min",
      image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
      coverImage: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
      description: "Premium Japanese cuisine featuring fresh sushi and sashimi.",
      menu: [
        {
          id: 8,
          name: "Dragon Roll",
          price: 22.99,
          description: "Eel and avocado roll with special sauce",
          image: "https://images.pexels.com/photos/2098126/pexels-photo-2098126.jpeg",
          category: "Sushi Rolls"
        },
        {
          id: 9,
          name: "Salmon Nigiri",
          price: 15.99,
          description: "Fresh salmon over seasoned rice",
          image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg",
          category: "Nigiri"
        }
      ]
    },
    {
      id: 4,
      name: "Pizza Roma",
      cuisine: "Italian",
      rating: 4.6,
      deliveryTime: "30-40 min",
      image: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg",
      coverImage: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg",
      description: "Authentic Italian pizzas and pasta made with traditional recipes.",
      menu: [
        {
          id: 10,
          name: "Margherita Pizza",
          price: 14.99,
          description: "Classic tomato, mozzarella, and basil",
          image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
          isVegan: true,
          category: "Pizzas"
        },
        {
          id: 11,
          name: "Pasta Carbonara",
          price: 16.99,
          description: "Creamy pasta with pancetta and egg",
          image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
          category: "Pasta"
        }
      ]
    },
    {
      id: 5,
      name: "Green Garden",
      cuisine: "Vegan",
      rating: 4.4,
      deliveryTime: "20-30 min",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      coverImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      description: "100% plant-based dishes that are both healthy and delicious.",
      isVegan: true,
      menu: [
        {
          id: 12,
          name: "Buddha Bowl",
          price: 15.99,
          description: "Quinoa, avocado, and roasted vegetables",
          image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
          isVegan: true,
          category: "Bowls"
        },
        {
          id: 13,
          name: "Vegan Burger",
          price: 13.99,
          description: "Plant-based patty with fresh toppings",
          image: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg",
          isVegan: true,
          category: "Burgers"
        }
      ]
    }
  ];

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setMessage(`${item.name} added successfully!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          // Remove item if quantity becomes 0
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean); // Remove null items
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const handleCheckout = (total) => {
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#2C3E50] mb-8">
          {selectedRestaurant ? selectedRestaurant.name : "Restaurants"}
        </h1>

        {message && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#C89650] text-white px-4 py-2 rounded shadow-lg">
            {message}
          </div>
        )}

        {selectedRestaurant ? (
          <RestaurantView
            restaurant={selectedRestaurant}
            onAddToCart={addToCart}
            onBack={() => setSelectedRestaurant(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelect={setSelectedRestaurant}
              />
            ))}
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
        />

        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="fixed bottom-4 left-4 bg-[#C89650] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#A36A3D] transition duration-300"
        >
          {isCartOpen ? "Hide Cart" : `View Cart (${cart.length})`}
        </button>
      </div>
    </div>
  );
};

export default Restaurant;
