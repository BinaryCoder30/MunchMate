const Reataurant = require("../models/restaurant.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");


const createRestaurant = asyncHandler(async (req,res)=>{
    
    const { name ,location,contactInfo,cuisineType} = req.body
    const admin = req.admin
    if(!name || !location || !contactInfo || !cuisineType){
        throw new ApiError(400,"All fields are requird.")
    }

    const createdobj = await Reataurant.create({
        name ,location,contactInfo,cuisineType,admin:admin?._id
    })

    if(!createdobj){
        throw new ApiError(500,"Some internal error occured")
    }

    return res.status(201).json(new ApiResponse(201,createdobj,"Success!"))
})

module.exports = {createRestaurant};