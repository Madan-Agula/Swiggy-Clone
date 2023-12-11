const verifyController = require("../controllers/verifyController");

module.exports = (app)=>{
    app.post("/sendotp",verifyController.sendOtp);
    app.post("/verifyotp",verifyController.verifyOtp)
}