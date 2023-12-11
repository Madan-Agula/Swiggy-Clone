const itemsModel = require("../models/restaurantItemsModel");

exports.create = (req, res) => {
  const { restaurantId, menuLists } = req.body;

  const newItemsList = new itemsModel({
    restaurantId,
    menuLists
  });
  newItemsList
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

exports.fetch = (req, res) => {
  const _id = req.param.id;
  itemsModel
    .find({ restaurantId: _id })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "data not found" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "server not available" });
    });
};

exports.fetchOne = (req,res)=>{
  const id = req.params.id;
  itemsModel.find({restaurantId:id}).then((data) => {
    if (!data) {
      res.status(404).json({ message: "data not found" });
    }
    res.send(data);
  })
  .catch((err) => {
    res.status(500).json({ message: "server not available" });
  });
}
