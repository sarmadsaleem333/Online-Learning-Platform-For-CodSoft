const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserResponseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    responses: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true,
        },
        selectedOption: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option',
        },
    }],
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    score: {
        type: Number,
        default: 0,
    },
});

const UserResponse = mongoose.model("UserResponse", UserResponseSchema);
module.exports = UserResponse;