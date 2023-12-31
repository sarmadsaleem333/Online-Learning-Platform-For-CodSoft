const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizSchema = new Schema({
    topic: {
        type: String,
        required: true,
    },
 
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    totalMarks: {
        type: Number,
    },
});
const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;