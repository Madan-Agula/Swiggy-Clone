const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  restaurantId: String,
  menuLists: Array,
});

const itemsModel = mongoose.model("itemsList", itemsSchema);

module.exports = itemsModel;
