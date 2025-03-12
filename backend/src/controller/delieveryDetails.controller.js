const DeliveryDetails = require("../models/delieveryDetails.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createDeliveryDetails = asyncHandler(async (req, res) => {
    const { orderID, deliveryPartnerID, estimatedTime } = req.body;

    // Validate required fields
    if (!orderID || !deliveryPartnerID || !estimatedTime) {
        throw new ApiError(400, "All fields are required.");
    }

    // Create delivery details entry
    const createdObj = await DeliveryDetails.create({
        order: orderID,
        deliveryPartner: deliveryPartnerID,
        deliveryStatus: "Pending",  // Default status
        estimatedTime,
        actualDeliveryTime: null
    });

    if (!createdObj) {
        throw new ApiError(500, "Some internal error occurred.");
    }

    return res.status(201).json(new ApiResponse(201, createdObj, "Success!"));
});

const updateDeliveryStatus = asyncHandler(async (req, res) => {
    const { deliveryID } = req.params;
    const { deliveryStatus, actualDeliveryTime } = req.body;

    // Validate required fields
    if (!deliveryStatus) {
        throw new ApiError(400, "Delivery status is required.");
    }

    // Allowed statuses
    const validStatuses = ["Pending", "Dispatched", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(deliveryStatus)) {
        throw new ApiError(400, "Invalid delivery status.");
    }

    const updateData = { deliveryStatus };
    if (deliveryStatus === "Delivered") {
        updateData.actualDeliveryTime = actualDeliveryTime || new Date();
    }

    const updatedObj = await DeliveryDetails.findByIdAndUpdate(
        deliveryID,
        updateData,
        { new: true }
    );

    if (!updatedObj) {
        throw new ApiError(404, "Delivery details not found.");
    }

    return res.status(200).json(new ApiResponse(200, updatedObj, "Delivery details updated successfully!"));
});

module.exports = { createDeliveryDetails, updateDeliveryStatus };
