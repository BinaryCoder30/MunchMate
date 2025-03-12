const DeliveryPartner = require("../models/delieveryPartner.model");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createDelieveryPartner = asyncHandler(async (req, res) => {
    const { name, contactNumber, vehicleDetails, availability } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !vehicleDetails || availability === undefined) {
        throw new ApiError(400, "All fields are required.");
    }

    // Create Delivery Partner
    const createdObj = await DeliveryPartner.create({
        name,
        contactNumber,
        vehicleDetails,
        availability
    });

    if (!createdObj) {
        throw new ApiError(500, "Some internal error occurred.");
    }

    return res.status(201).json(new ApiResponse(201, createdObj, "Delivery Partner created successfully!"));
});

module.exports = { createDelieveryPartner };
