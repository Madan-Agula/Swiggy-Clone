const restaurantModel = require("../models/restaurantModel");

exports.create = (req, res) => {
  const {
    name,
    cloudinaryImageId,
    avgRating,
    areaName,
    cuisines,
    costForTwo,
    discount,
    deliveryTime,
    distance,
    feeDetails,
    extrafee,
    totalRatingsString,
    maxDeliveryTime
  } = req.body;

  const newRestaurant = new restaurantModel({
    name,
    cloudinaryImageId,
    avgRating,
    areaName,
    cuisines,
    costForTwo,
    discount,
    deliveryTime,
    distance,
    feeDetails,
    extrafee,
    totalRatingsString,
    maxDeliveryTime
  });
  newRestaurant
    .save()
    .then((data) => {
      if (!data) {
        res.status(400).send("something went wrong");
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "server not available" });
    });
};

exports.fetch = (req,res)=>{
  restaurantModel.find().then((data) => {
    if (!data) {
      res.status(400).send("something went wrong");
    }
    res.send(data);
  })
  .catch((err) => {
    res.status(500).json({ message: "server not available" });
  });
}

exports.fetchOne = (req,res)=>{
  const id = req.params.id;
  restaurantModel.find({_id:id}).then((data) => {
    if (!data) {
      res.status(400).send("something went wrong");
    }
    res.send(data);
  })
  .catch((err) => {
    res.status(500).json({ message: "server not available" });
  });
}
