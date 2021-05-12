const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
    }
});


const Course =mongoose.model('COURSE', courseSchema);

module.exports = Course;