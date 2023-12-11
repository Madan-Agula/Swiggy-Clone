const userModel = require("../models/userDetailsModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

exports.signup = (req, res) => {
  const { fullName, email, password } = req.body;
 
  const newUser = new userModel({
    fullName,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  userModel
    .findOne({ email })
    .then((data) => {
      if (data) {
        return res
          .status(400)
          .json({ status: false, message: "email already exits" });
      } else {
        newUser
          .save()
          .then((data) =>
            res
              .status(200)
              .json({ status: true, message: "successfull registered" })
          );
      }
    })
    .catch((err) => res.status(500).json({ message: "severe not connected" }));
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ status: false, message: "email ID invalid" });
      }
      let isValidPassword = bcrypt.compareSync(password, data.password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ status: false, message: "invalid password" });
      }
      let token = jwt.sign({ id: data._id }, secretKey, { expiresIn: "2d" });
      return res.status(200).json({
        status: true,
        user: {
          fullName: data.fullName,
          email: data.email,
        },
        token,
      });
    })
    .catch((err) => res.status(500).json({ message: "server is not running" }));
};

exports.updateOne = (req, res) => {
  let { id, password } = req.body;
  password = bcrypt.hashSync(password, 10);
  userModel
    .findByIdAndUpdate({ _id: id }, password)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      return res
        .status(200)
        .json({ status: true, fullName: data.fullName, email: data.email });
    })
    .catch((err) => res.status(500).json("server not available"));
};

exports.verifyjwtToken = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      return res.status(401).json({status:false, message: "Invalid token" });
    }
    return res.status(200).json({status:true, message: "jwt token verified" });
  });
};
