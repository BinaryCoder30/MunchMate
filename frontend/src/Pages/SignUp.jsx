import { useState, useContext } from "react";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../context/AuthContext.jsx";
import login_photo from "../assets/AccountPhoto.jpg";

const AuthForm = () => {
  const navigate = useNavigate();
  // const { login } = useContext(AuthContext) || {}; // Prevent error if AuthContext is undefined

  const [formData, setFormData] = useState({
   name:"",
    email: "",
    phone: "", // Added Phone Number field
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Fields Before Sending Request
  const validateForm = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  // Handle form submission
  const handleSignup = async () => {
    if (!validateForm()) {
      setError("All fields are required!");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        { withCredentials: true }
      );

      console.log(res);
     alert(res.data.message);
      // login?.(res.data.user, res.data.token); // Store user data
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Unexpected response from server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f0f4f8]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-[850px] shadow-lg rounded-lg overflow-hidden bg-white"
      >
        {/* Left Side (Image Section) */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-1/2 relative"
        >
          <img src={login_photo} alt="Login" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-1/2 p-8"
        >
          <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 text-center">Create an account</h2>

          {/* Form Fields */}
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="First Name" className="w-full p-3 bg-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] hover:bg-gray-300 transition-all duration-300 shadow-sm" />


          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 mt-4 bg-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] hover:bg-gray-300 transition-all duration-300 shadow-sm" />

          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 mt-4 bg-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] hover:bg-gray-300 transition-all duration-300 shadow-sm" />

          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full p-3 mt-4 bg-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] hover:bg-gray-300 transition-all duration-300 shadow-sm" />

          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your Address" className="w-full p-3 mt-4 bg-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] hover:bg-gray-300 transition-all duration-300 shadow-sm" />

          {/* Signup Button */}
          <button 
            onClick={handleSignup} 
            className={`w-full mt-6 py-3 rounded-lg text-white transition-all duration-300 shadow-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Social Logins */}
          <p className="text-[#1e3a8a] text-center my-4">Or register with</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#1e3a8a] p-3 rounded-lg text-white hover:bg-[#1e3a8a]/90 transition-all duration-300 shadow-md"><FaGoogle className="w-5 h-5" /></button>
            <button className="bg-[#1e3a8a] p-3 rounded-lg text-white hover:bg-[#1e3a8a]/90 transition-all duration-300 shadow-md"><FaApple className="w-5 h-5" /></button>
            <button className="bg-[#1e3a8a] p-3 rounded-lg text-white hover:bg-[#1e3a8a]/90 transition-all duration-300 shadow-md"><FaFacebook className="w-5 h-5" /></button>
          </div>

          {/* Login Section */}
          <p className="text-[#1e3a8a] text-center mt-6">Already have an account?</p>
          <button 
            onClick={() => navigate("/login")} 
            className="w-full mt-2 bg-[#1e3a8a] text-white py-3 rounded-lg hover:bg-[#1e3a8a]/90 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
