const mongoose = require("mongoose");
const { Schema } = mongoose;
const PublishedCourseSchema = new Schema({
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
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },

});

const PublishedCourse = mongoose.model("published-course-learning-platform", PublishedCourseSchema);
module.exports = PublishedCourse;