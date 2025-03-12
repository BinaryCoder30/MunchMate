const mongoose = require("mongoose")

const deliveryDetailsSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    deliveryPartnerID: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPartner", required: true },
    deliveryStatus: { type: String, enum: ["Assigned", "Picked Up", "In Transit", "Delivered"], default: "Assigned" },
    estimatedTime: { type: Date },
    actualDeliveryTime: { type: Date },
  }, { timestamps: true });
  
  module.exports = mongoose.model("DeliveryDetails", deliveryDetailsSchema);

  