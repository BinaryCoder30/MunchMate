const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // 🔹 Import bcrypt
const jwt = require("jsonwebtoken"); // 🔹 Import jsonwebtoken

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    restaurantID: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }, 
  },
  { timestamps: true }
);


// 🔹 Generate JWT Token
adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      restaurant_admin: true, // Only if needed
    },
    process.env.JWT_SECRET, // 🔹 Fixed typo (JWT_SECRET)
    { expiresIn: "1d" }
  );
};

module.exports = mongoose.model("Admin", adminSchema);
