const OrderDetails = require("../models/orderDetails.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createOrderDetails = asyncHandler(async (req, res) => {
    const { quantity, subtotal, orderID, itemID } = req.body;
    const user = req.user

    // Validate required fields
    if (!quantity || !subtotal || !orderID || !itemID) {
        throw new ApiError(400, "All fields are required.");
    }

    // Create order details entry
    const createdObj = await OrderDetails.create({
        quantity,
        subtotal,
        order: orderID,
        item: itemID
    });

    if (!createdObj) {
        throw new ApiError(500, "Some internal error occurred.");
    }

    return res.status(201).json(new ApiResponse(201, createdObj, "Success!"));
});

module.exports = { createOrderDetails };
