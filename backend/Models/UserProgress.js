const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserProgressSchema = new Schema({
    totalQuizzes: {
        type: Number,
    },
    attemptedQuizzes: {
        type: Number
    },
    quizzesMarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserResponse',
    }],
    percentage: {
        type: Number,
    }

});


const UserProgress = mongoose.model("UserProgress", UserProgressSchema);
module.exports = UserProgress;