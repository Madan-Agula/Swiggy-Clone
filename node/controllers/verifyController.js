const userModel = require("../models/userDetailsModel");
const nodemailer = require("nodemailer");
const verifyModel = require("../models/verifyModel");
require('dotenv').config();
const host = process.env.NODEMAILER_HOST;
const port = process.env.NODEMAILER_PORT;
const user = process.env.NODEMAILER_USER;
const pass = process.env.NODEMAILER_PASS;

exports.sendOtp = (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  verifyModel.deleteMany({ email }).then(() => {
    userModel
      .findOne({ email })
      .then((data) => {
        if (!data) {
          return res.status(404).json({status:false, message: "email not found" });
        }
        const id = data.id;
        const newUserOtpDetails = new verifyModel({
          id,
          email,
          otp,
          createdAt: Date.now(),
          expireAt: Date.now() + 600000,
        });

        newUserOtpDetails.save().then(async (data) => {
          if (!data) {
            return res.status(400).json({status:false, message: "data not found" });
          }

          const transporter = await nodemailer.createTransport({
            host: host,
            port: port,
            auth: {
              user: user,
              pass:pass,
            },
          });

          const info = await transporter.sendMail({
            from: '"Swiggy-clone👻" <swiggy-clone@gmail.com>',
            to: `${data.email}`,
            subject: "swiggy-clone verification otp",
            html: `<p>Swiggy-clone verification otp :<b>${otp}</b> expires in 10 mins </p>`,
          });

          return res
            .status(200)
            .json({status:true,id, message: "otp sent successfully", id: data.id });
        });
      })
      .catch((err) => res.status(500).json({ message: "server not exits" }));
  });
};

exports.verifyOtp = (req, res) => {
  const { id, otp } = req.body;
  try {
    verifyModel.findOne({ id }).then(async (data) => {
      if (data.otp !== otp || Date.now() > data.expireAt) {
        return res.status(401).json({ message: "otp is invalid" });
      }
      else{
        const transporter = await nodemailer.createTransport({
          host: host,
          port: port,
          auth: {
            user: user,
            pass:pass,
          },
        });

        const info = await transporter.sendMail({
          from: '"Swiggy-clone👻" <swiggy-clone@gmail.com>',
          to: `${data.email}`,
          subject: "swiggy-clone password reset successfully",
          html: `<b>Swiggy-clone password has been changed successfully please login into Swiggy-Clone </b>`,
        });
        return res.status(200).json({status:true, message: "otp accepted", id: data.id });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "server not found" });
  }
};
