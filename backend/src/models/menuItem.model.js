const mongoose = require("mongoose")
const menuItemSchema = new mongoose.Schema({
    restaurantID: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    availability: { type: Boolean, default: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model("MenuItem", menuItemSchema);
