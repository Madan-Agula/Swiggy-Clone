const mongoose = require("mongoose");

const restuarantSchema = mongoose.Schema({
    name:String,
    cloudinaryImageId:String,
    avgRating:String,
    areaName:String,
    cuisines:Array,
    costForTwo: String,
    discount:String,
    deliveryTime:String,
    distance:String,
    feeDetails:String,
    extrafee:String,
    totalRatingsString:String,
    maxDeliveryTime:String
});

const restaurantModel = mongoose.model("restaurants",restuarantSchema);

module.exports = restaurantModel;