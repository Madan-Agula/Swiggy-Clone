const itemsList = require("../controllers/restaurantItemListController")

module.exports = (app)=>{
    app.post('/restaurantsItems',itemsList.create);
    app.get('/itemsList/:id',itemsList.fetchOne)
}