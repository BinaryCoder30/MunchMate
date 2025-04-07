const Reataurant = require("../models/restaurant.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");


const createRestaurant = asyncHandler(async (req,res)=>{
    const { name ,location,contact,cuisineType} = req.body
    const admin = req.admin
    if(!name || !location || !contact || !cuisineType){
        throw new ApiError(400,"All fields are requird.")
    }

    const createdobj = await Reataurant.create({
        name ,location,contactInfo:contact,cuisineType,admin:req.admin?._id
    })
    
    if(!createdobj){
        throw new ApiError(500,"Some internal error occured")
    }

    return res.status(201).json(new ApiResponse(201,createdobj,"Success!"))
})

const getRestraurantData = async(req,res)=>{
    const id = req.params.id
    
}

module.exports = {createRestaurant,getRestraurantData};