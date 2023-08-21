const mongoose = require("mongoose");
const { Schema } = mongoose;
const QuestionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option', 
    }],
});

const Question = mongoose.model("question-learning-platform", QuestionSchema);
module.exports = Question;