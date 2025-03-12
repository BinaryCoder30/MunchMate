const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurantID: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    orderStatus: { type: String, enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"], default: "Pending" },
    paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    orderDateTime: { type: Date, default: Date.now },
}, { timestamps: true });
  
module.exports = mongoose.model("Order", orderSchema);
