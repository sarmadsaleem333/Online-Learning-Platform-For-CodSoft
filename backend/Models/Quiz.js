const mongoose = require("mongoose");
const { Schema } = mongoose;
const QuizSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
});

const Quiz = mongoose.model("quiz-learning-platform", QuizSchema);
module.exports = Quiz;