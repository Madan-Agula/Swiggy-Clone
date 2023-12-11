const userController = require("../controllers/userController");

module.exports = (app)=>{
    app.post("/register",userController.signup);
    app.post("/login",userController.login);
    app.put("/updatepassword",userController.updateOne)
    app.post("/verifyjwt",userController.verifyjwtToken);
}