import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      const { token, user } = res.data.data; // Get token from response

      localStorage.setItem("token", token); // Store JWT in localStorage
      localStorage.setItem("user", JSON.stringify(user)); // Store user data

      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-1/2 bg-white p-8 rounded-lg shadow-xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#1e3a8a] text-3xl font-bold mb-8 text-center"
        >
          Welcome Back!
        </motion.h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-[#f0f4f8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] hover:bg-[#e2e8f0] transition-all duration-300 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 mt-4 bg-[#f0f4f8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] hover:bg-[#e2e8f0] transition-all duration-300 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-end mt-3"
        >
          <p className="text-[#1e3a8a] text-sm underline cursor-pointer hover:text-[#1e3a8a]/80 transition-colors duration-300">
            Forgot password?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6"
        >
          <button
            className="w-full bg-[#1e3a8a] text-white py-3 rounded-lg hover:bg-[#1e3a8a]/90 hover:scale-105 transition-all duration-300 shadow-md"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center my-6"
        >
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="mx-4 text-gray-500">or</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center space-x-4"
        >
          <button className="bg-[#1e3a8a] p-3 rounded-lg text-white hover:bg-[#1e3a8a]/90 hover:scale-105 transition-all duration-300 shadow-md">
            <FaGoogle className="w-5 h-5" />
          </button>
          <button className="bg-[#1e3a8a] p-3 rounded-lg text-white hover:bg-[#1e3a8a]/90 hover:scale-105 transition-all duration-300 shadow-md">
            <FaApple className="w-5 h-5" />
          </button>
          <button className="bg-[#1e3a8a] p-3 rounded-lg text-white hover:bg-[#1e3a8a]/90 hover:scale-105 transition-all duration-300 shadow-md">
            <FaFacebook className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-[#1e3a8a]">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-2 text-[#1e3a8a] underline hover:text-[#1e3a8a]/80 transition-colors duration-300"
          >
            Sign Up
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
