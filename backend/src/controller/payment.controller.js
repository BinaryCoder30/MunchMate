const Payment = require("../models/payment.model");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createPayment = asyncHandler(async (req, res) => {
    const { orderID, paymentMethod, transactionID, paymentStatus } = req.body;

    // Validate required fields
    if (!orderID || !paymentMethod || !transactionID || !paymentStatus) {
        throw new ApiError(400, "All fields are required.");
    }

    // Create Payment entry
    const createdPayment = await Payment.create({
        orderID,
        paymentMethod,
        transactionID,
        paymentStatus
    });

    if (!createdPayment) {
        throw new ApiError(500, "Some internal error occurred.");
    }

    return res.status(201).json(new ApiResponse(201, createdPayment, "Payment recorded successfully!"));
});

module.exports = { createPayment };
