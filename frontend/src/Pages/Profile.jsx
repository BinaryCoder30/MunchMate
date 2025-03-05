import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gold-500 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold">John Doe</h2>
          <p className="text-gray-400">Software Engineer</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Email:</span>
            <span>johndoe@example.com</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Phone:</span>
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Location:</span>
            <span>Mumbai, India</span>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-500 transition">
            Edit Profile
          </button>
          <button className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
