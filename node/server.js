const express = require("express");
const app = express();

const dotenv = require('dotenv')
dotenv.config();

const bodyParse = require("body-parser");
const port = process.env.PORT || 8000;
const databaseURL = process.env.DATABASE_URL;

const mongoose = require("mongoose");
const Cors = require("cors");

app.use(Cors()) 
app.use(bodyParse.json());

const router = require("./routers/restaurantRouters");
const itemListsRouter = require("./routers/restaurantItemsRouter")
const userRouter = require("./routers/userDetailsRouter")
const verifyRouter = require("./routers/verifyRouter");

mongoose.connect(databaseURL);
const db = mongoose.connection;
db.on("open", () => {
  console.log("succussfully connected");
});

db.on("error", () => {
  console.log("Not connected");
});

router(app);
itemListsRouter(app);
userRouter(app);
verifyRouter(app);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
