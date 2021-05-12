// const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET_KEY } = require("./key");
// const port = 5000;
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// app.use(cors());
// app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ach2z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// app.use(express.urlencoded({ extended: false }));
// const MongoClient = require("mongodb").MongoClient;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect((err) => {
//   const userCollection = client.db("MasteringStudy").collection("Userlist");
//   const courseCollection = client.db("MasteringStudy").collection("courses");
//   const ordersCollection = client.db("MasteringStudy").collection("orders");
  

//   app.post("/signUp", (req, res) => {
//     const user = req.body;
//     const fName = user.firstName;
//     const lName = user.lastName;
//     const email = user.email;
//     const password = user.password;
//     if (!fName || !lName || !email || !password) {
//       return  res.send({
//         errors:
//           "Please enter a valid Name, Email and Password must contain one Capital letter,one small letter, One spacial character, One number and Length must be 8 or more than 8",
//       });
//     }
//     const errors = {};
//     userCollection.findOne({ email: email }).then((isUser) => {
//       if (isUser) {
//         errors.text = "Email already in use";
//         return res.send(errors);
//       } else {
//         bcrypt.hash(password, saltRounds, function (err, hash) {
//           userCollection
//             .insertOne({
//               firstName: fName,
//               lastName: lName,
//               email: email,
//               password: hash,
//             })
//             .then((result) => {
//               return  res.send(
//                 (newUser = {
//                   firstName: fName,
//                   lastName: lName,
//                   email: email,
//                   password: hash,
//                   accountCreated: true,
//                 })
//               );
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         });
//       }
//     });
//   });

//   app.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return  res.send({ errors: "Please enter a valid email and password" });
//     }

//     userCollection
//       .findOne({ email: email })
//       .then((existedUser) => {
//         if (!existedUser) {
//           return res.status(422).json({ error: "User not registered" });
//         } else {
//           bcrypt.compare(password, existedUser.password).then((passMatched) => {
//             if (passMatched) {
//               var token = jwt.sign({ _id: existedUser._id }, JWT_SECRET_KEY);
//               return  res.send(
//                 (loggedInUser = {
//                   email: email,
//                   password: password,
//                   isLoggedIn: true,
//                   token: token,
//                   success: "User login successful"
//                 })
//               );
//               //console.log(loggedInUser);

//                return res.status(200).json({ success: "User login successful" });
//             } else {
//               return res
//                 .status(422)
//                 .json({ error: "Invalid email & password" });
//             }
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
//   app.post("/courses", (req, res) => {
//     const course = req.body;

//     courseCollection.insertOne(course).then((result) => {
//       return res.send(result.insertedCount > 1);
//     });
//   });
//   app.get("/singleCourse", (req, res) => {
//     courseCollection.find({}).toArray((err, documents) => {
//       return res.send(documents);
//     });
//   });

//   app.post("/order", (req, res) => {
//     const order = req.body;
//     const { email,id} = order;
//     // res.send({email,id});

//     ordersCollection.insertOne(order).then((result) => {
//       if (result) {
//         let transporter = nodemailer.createTransport({
//           host: "smtp.gmail.com",
//           port: 587,
//           secure: false, // true for 465, false for other ports
//           auth: {
//             user: 'kaiyoumkhan0@gmail.com', // generated ethereal user
//             pass: process.env.EMAIL_PASSWORD, // generated ethereal password
//           },
//         });
//         // send mail with defined transport object
//         let info = {
//           from: '"MasteringStudy" <kaiyoumkhan0@gmail.com>', // sender address
//           to: email, // list of receivers
//           subject: "Course Enrollment", // Subject line
//           text: "Congratulation for your course enrollment", // plain text body
//         };
//         transporter.sendMail(info, ((error, data) => {
//           if (error) {
//             return res.send({
//               "text": "email not sent",
//           })
//           }
//           else {
//            return res.send({
//               "text": "email  sent",
//               "orderComplete":result.insertedCount > 0
//           })
//           }
//         }))
//       }
//       // console.log(result);
//       // res.send(result.insertedCount > 0);
//     }).catch((err) => {
//       return res.send(err);
//     })
    
// // let transporter = nodemailer.createTransport({
// //   host: "smtp.gmail.com",
// //   port: 587,
// //   secure: false, // true for 465, false for other ports
// //   auth: {
// //     user:'kaiyoumkhan0@gmail.com', // generated ethereal user
// //     pass: process.env.EMAIL_PASSWORD, // generated ethereal password
// //   },
// // });

// // // send mail with defined transport object
// // let info = {
// //   from: '"MasteringStudy" <kaiyoumkhan0@gmail.com>', // sender address
// //   to: email, // list of receivers
// //   subject: "Course Enrollment", // Subject line
// //   text: "Congratulation for your course enrollment", // plain text body
// // }

// // transporter.sendMail(info, ((error, data) => {
// //   if (error) {
// //       res.send("email not sent") 
// //   }
// //   else{
// //     res.send("email sent")  
// //   }
// // }))
  
  
  
//   });
// });

// app.get("/", (req, res) => {
//   res.send("Hello kk");
// });

// app.listen(process.env.PORT || port);
