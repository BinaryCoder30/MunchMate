import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About MunchMate */}
          <div>
            <h3 className="text-2xl font-bold mb-4">MunchMate</h3>
            <p className="text-[#E0E0E0] mb-4">
              Connecting food lovers with their favorite restaurants. Experience the best local cuisines with just a few clicks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#E0E0E0] hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-[#E0E0E0] hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-[#E0E0E0] hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#E0E0E0] hover:text-white">About Us</a></li>
              <li><a href="#" className="text-[#E0E0E0] hover:text-white">Careers</a></li>
              <li><a href="#" className="text-[#E0E0E0] hover:text-white">Partner With Us</a></li>
              <li><a href="#" className="text-[#E0E0E0] hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-[#E0E0E0]">
                <i className="fas fa-map-marker-alt mr-2"></i>
                123 Food Street, Cuisine City, FC 12345
              </li>
              <li className="flex items-center text-[#E0E0E0]">
                <i className="fas fa-phone mr-2"></i>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-[#E0E0E0]">
                <i className="fas fa-envelope mr-2"></i>
                support@munchmate.com
              </li>
            </ul>
          </div>

          {/* Get the App */}
          <div>
            <h4 className="text-2xl font-bold mb-3 text-white">Get the MunchMate App</h4>
            <p className="text-[#E0E0E0] mb-6">We will send you a link, open it on your phone to download the app</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#3498DB] text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-[#2C3E50] transition-all duration-200 w-full sm:w-auto">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-[#E0E0E0]">Download on the</span>
                  <span className="text-lg font-semibold">App Store</span>
                </div>
              </button>

              <button className="bg-[#3498DB] text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-[#2C3E50] transition-all duration-200 w-full sm:w-auto">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-[#E0E0E0]">GET IT ON</span>
                  <span className="text-lg font-semibold">Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#E0E0E0] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#E0E0E0] text-sm">
              © 2024 MunchMate. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-[#E0E0E0] hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-[#E0E0E0] hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-[#E0E0E0] hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;