const Order = require("../models/order.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createOrder = asyncHandler(async (req,res)=>{
    
    const {restaurantID,totalAmount,orderStatus,paymentStatus,orderDateTime} = req.body
    const user = req.user
    if(!restaurantID || !totalAmount || !orderStatus || !paymentStatus || !orderDateTime){
        throw new ApiError(400,"All fields are requird.")
    }

    const createdobj = await Order.create({
        restaurantID,totalAmount,orderStatus,paymentStatus,orderDateTime,user:user?._id
    })

    if(!createdobj){
        throw new ApiError(500,"Some internal error occured")
    }

    return res.status(201).json(new ApiResponse(201,createdobj,"Success!"))
})

//check update

module.exports = {createOrder};

