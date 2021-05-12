const express = require("express");
const router = express.Router();
require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/userSchema");
// const User = mongoose.model('USER')

router.get("/", (req, res) => {
  res.send("Hello kk from server");
});

router.post("/signUp", async (req, res) => {
  const user = req.body;

  const fName = user.firstName;
  const lName = user.lastName;
  const email = user.email;
  const password = user.password;

  if (!fName || !lName || !email || !password) {
    return res.status(422).json({
      error:
        "Please enter a valid Email and Password must contain one Capital letter,one small letter, One spacial character, One number and Length must be 8 or more than 8",
    });
  }
  try {
    const existedUser = await User.findOne({ email: email });

    if (existedUser) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const user = new User({
      firstName: fName,
      lastName: lName,
      email,
      password,
    });
    await user.save();
    return res.status(201).json({ text: "User registered successfully" });

    // else {
    //   const user = new User({
    //     firstName: fName,
    //     lastName: lName,
    //     email: email,
    //     password: password,
    //   });
    //   const result = await user.save();
    //   if (!result) {
    //     return res.status(422).json({ error: "Invalid User credentials" });
    //   } else {
    //     return res.status(201).json({ text: "User registered successfully" });
    //   }
  } catch (error) {
    console.log(error);
  }
});

// user login

router.post("/login", async (req, res) => {
  // const data = req.body;
  // console.log(data);
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ errors: "Please enter a valid email and password" });
    }
    const existedUser = await User.findOne({ email: email });

    console.log(existedUser);

    if (existedUser) {
      const isMatch = await bcrypt.compare(password, existedUser.password);
      token = await existedUser.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log(token);

      if (!isMatch) {
        return res.status(422).json({ error: "Invalid User credentials" });
      } else {
        return res.status(200).json(
          (loggedInUser = {
            email: email,
            password: password,
            isLoggedIn: true,
            token: token,
            success: "User login successful",
          })
        );
      }
    } else {
      return res.status(200).json({ error: "Invalid User credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/forgot-password", (req, res) => {
  
  const email = req.body.email;

  if (!email) {
    return res.send({ error: "Please enter a valid email" });
  }
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    } else {
      const token = buffer.toString("hex");
      console.log(token);
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return res.status(422).json({ error: "User does not exists" });
        } else {
          user.resetToken = token;
          user.expireToken = Date.now() + 360000;
          user.save().then((result) => {
            // console.log(user);
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, 
              auth: {
                user: "kaiyoumkhan0@gmail.com", 
                pass: process.env.EMAIL_PASSWORD, 
              },
            });
            // send mail with defined transport object
            let info = {
              from: '"MasteringStudy" <no-reply@gmail.com>',
              to: email, 
              subject: "Reset Password", // Subject line
              html: ` 
              <h5>Click  <a href="http://localhost:3000/reset-password/${token}">Reset Password</a></h5>`
            };
           
            transporter.sendMail(info, (error, data) => {
              if (error) {
                console.log(error);
                return res.send({
                  error: "email not sent",
                });
              } else {
                return res.status(201).json({
                  text: "email  sent",
                });
              }
            });
          });
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  });
});

router.post("/reset-password", (req, res) => {
  const newPassword = req.body.password;
  const CPassword = req.body.CPassword;
  const token = req.body.token;
  console.log(newPassword);
 
  if (newPassword !== CPassword) {
    return res.send({ errors: "Password does not match" });
  }
  User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again, session expired" })
      } else {
        bcrypt.hash(newPassword, 12).then(hashedPassword => {
          user.password = newPassword;
          user.resetToken = undefined;
          user.expireToken = undefined;
          user.save().then((savedUser) => {
            return res.status(200).json({ text: " Password changed successfully" })
          })
        })
      }
    }).catch((error) => {
      console.log(error);
    }) 
  
})

module.exports = router;

