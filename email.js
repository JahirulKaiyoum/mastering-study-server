// const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user:'kaiyoumkhan0@gmail.com', // generated ethereal user
//       pass: process.env.EMAIL_PASSWORD, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
// let info = {
//     from: '"MasteringStudy" <kaiyoumkhan0@gmail.com>', // sender address
//     to: "kaiyoumkhan0@gmail.com", // list of receivers
//     subject: "Course Enrollment", // Subject line
//     text: "Congratulation for your course enrollment", // plain text body
// }

// transporter.sendMail(info, (error, data => {
//     if (error) {
//         res.send(error) 
//     }
//     else{
//       res.send("email sent")  
//     }
//   }))


 // ordersCollection.insertOne(order).then((result) => {
  //   if (result) {
  //     let transporter = nodemailer.createTransport({
  //       host: "smtp.gmail.com",
  //       port: 587,
  //       secure: false, // true for 465, false for other ports
  //       auth: {
  //         user: 'kaiyoumkhan0@gmail.com', // generated ethereal user
  //         pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  //       },
  //     });
  //     // send mail with defined transport object
  //     let info = {
  //       from: '"MasteringStudy" <kaiyoumkhan0@gmail.com>', // sender address
  //       to: email, // list of receivers
  //       subject: "Course Enrollment", // Subject line
  //       text: "Congratulation for your course enrollment", // plain text body
  //     };
  //     transporter.sendMail(info, ((error, data) => {
  //       if (error) {
  //         return res.send({
  //           "text": "email not sent",
  //       })
  //       }
  //       else {
  //        return res.send({
  //           "text": "email  sent",
  //           "orderComplete":result.insertedCount > 0
  //       })
  //       }
  //     }))
  //   }

  // }).catch((err) => {
  //   return res.send(err);
  // })