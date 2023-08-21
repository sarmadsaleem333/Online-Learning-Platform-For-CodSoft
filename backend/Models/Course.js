const mongoose = require("mongoose");
const { Schema } = mongoose;
const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Instructor'
    },
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
    }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    }],

});

const Course = mongoose.model("course-learning-platform", CourseSchema);
module.exports = Course;