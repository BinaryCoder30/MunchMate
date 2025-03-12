const mongoose = require("mongoose")
const deliveryPartnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNumber: { type: String, required: true, unique: true },
    vehicleDetails: { type: String, required: true },
    availability: { type: Boolean, default: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
  