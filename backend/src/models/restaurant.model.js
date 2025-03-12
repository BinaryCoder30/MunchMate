const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    contactInfo: { type: String, required: true },
    cuisineType: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, 
}, { timestamps: true });
  
module.exports = mongoose.model("Restaurant", restaurantSchema);