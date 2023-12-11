const restaurantController = require('../controllers/restaurantController')

module.exports = (app)=>{
    app.post('/restaurants',restaurantController.create);
    app.get('/restaurants',restaurantController.fetch)
    app.get('/restaurants/:id',restaurantController.fetchOne)
}