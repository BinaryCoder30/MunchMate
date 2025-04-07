import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/create', formData);
      alert('Signup successful:', response.data);
      // navigate('/admin/dashboard');
      // Handle success (e.g., redirect, show a success message)
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6 animate-fade-in">
          Admin Signup
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-blue-500" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-blue-300 rounded-lg"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-blue-500" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-blue-300 rounded-lg"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-blue-500" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-blue-300 rounded-lg"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center transition-all duration-300"
          >
            {isSubmitting ? 'Signing Up...' : <>Sign Up <FaArrowRight className="ml-2" /></>}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-blue-600">
          <a href="#" className="hover:text-blue-800">Already have an account? Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
