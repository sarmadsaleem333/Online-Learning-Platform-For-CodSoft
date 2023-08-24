const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserCourseSchema = new Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PublishedCourse',
    },
    progress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProgress',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});


const UserCourse = mongoose.model("UserCourse", UserCourseSchema);
module.exports = UserCourse;