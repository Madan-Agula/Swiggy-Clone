const mongoose = require("mongoose");

const verifySchema = mongoose.Schema({
    id:String,
    email:String,
    otp:Number,
    createdAt:Number,
    expireAt:Number
});

const verifyModel = mongoose.model("otpVerification",verifySchema);

module.exports = verifyModel;