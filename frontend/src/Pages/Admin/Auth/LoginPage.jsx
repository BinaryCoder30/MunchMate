import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Set cookies with expiration
      Cookies.set("adminToken", data.token, { 
        expires: 7, // Expires in 7 days
        sameSite: 'strict' // Protection against CSRF
      });
      
      Cookies.set("adminData", JSON.stringify(data.admin), {
        expires: 7,
        sameSite: 'strict'
      });
      
      // Call the onLogin callback
      // onLogin();
      
      // Redirect to dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-transparent animate-pulse pointer-events-none" />
        
        <motion.h2
          className="text-4xl font-extrabold text-white mb-8 text-center tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Admin Portal
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300" />
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300" />
            <motion.input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>

          {error && (
            <motion.p
              className="text-red-400 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            <FaSignInAlt />
            <span>{isSubmitting ? "Logging in..." : "Login"}</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;