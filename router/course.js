const express = require("express");
const router = express.Router();
require("../db/connection");

const Course = require("../models/courseSchema");

router.post("/courses", async (req, res) => {
  const singleCourse = req.body;
  const { title, price, discount, mode, duration, id } = singleCourse;
  try {
    const course = new Course({
      title,
      price,
      discount,
      mode,
      duration,
      id,
    });
    await course.save();
    return res.status(201).json({ text: "Course added successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/singleCourse", (req, res) => {
  Course.find({},(err, documents) => {
    return res.send(documents);
  });
});

module.exports = router;