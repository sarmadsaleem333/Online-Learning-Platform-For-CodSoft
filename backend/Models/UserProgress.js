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
        total: {
            type: Number,
        },
        obtained: {
            type: Number,
        },
    }],
    percentage:{
        type: Number,
    }

});


const UserProgress = mongoose.model("UserProgress", UserProgressSchema);
module.exports = UserProgress;