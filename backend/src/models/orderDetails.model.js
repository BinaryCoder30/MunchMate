const mongoose = require("mongoose")
const orderDetailSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    itemID: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
  }, { timestamps: true });
  
  module.exports = mongoose.model("OrderDetail", orderDetailSchema);
  