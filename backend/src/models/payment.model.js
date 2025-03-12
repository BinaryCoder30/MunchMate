const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: { type: String, enum: ["Credit Card", "Debit Card", "UPI", "Cash"], required: true },
    transactionID: { type: String, unique: true, sparse: true }, 
    paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Payment", paymentSchema);
  