const mongoose = require("mongoose");


const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ach2z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(() => {
    console.log("connected Successfully");
  }).catch((error) => {
    console.log("No connection");
  })