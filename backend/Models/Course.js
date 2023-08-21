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
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }]

});

const Course = mongoose.model("course-learning-platform", CourseSchema);
module.exports = Course;