const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
// const { JWT_SECRET_KEY } = require("./key");
const nodemailer = require("nodemailer");
const port = 5000;
require("./models/userSchema")
require("dotenv").config();
require("./db/connection")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.send("Hello kk");
});

app.use(require('./router/auth'));
app.use(require('./router/course'));
app.use(require('./router/order'));


app.listen(process.env.PORT || port);

