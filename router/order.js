const express = require("express");
const router = express.Router();
require("../db/connection");
const Order = require("../models/orderSchema");
const nodemailer = require("nodemailer");

router.post("/order", async (req, res) => {
  const userOrderData = req.body;
  const {email,orderItems,orderTime,userDetails, paymentId,} = userOrderData;
  const { _id, title, price, discount, mode, duration, id } = orderItems[0];
  const { name, phone } = userDetails;

  try {
    const order = new Order({
      email,
      orderItems: [{_id,title,id}],
      orderTime,
      userDetails: { email,name,phone,
      },
      paymentId,
    });
    const orderSuccess = await order.save();
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'kaiyoumkhan0@gmail.com', // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });
      // send mail with defined transport object
      let info = {
        from: '"MasteringStudy" <kaiyoumkhan0@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Course Enrollment", // Subject line
        text: "Congratulation for your course enrollment", // plain text body
      };
    transporter.sendMail(info, ((error, data) => {
      if (error) {
        return res.send({
          "text": "email not sent",
        })
      }
      else {
        return res.status(201).json({
          "text": "email  sent",
          "orderComplete": result.insertedCount > 0
        })
      }
    }));
    return res.status(201).json({ text: "order added successfully" });
  } catch (err) {
    console.log(err);
  }
 
});

module.exports = router;
