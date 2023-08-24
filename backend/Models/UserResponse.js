const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserResponseSchema = new Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    },
    totalMarks: {
        type: Number
    },
    obtainedMarks: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    percentage: {
        type: Number
    }
});
const UserResponse = mongoose.model("UserResponse", UserResponseSchema);
module.exports = UserResponse;