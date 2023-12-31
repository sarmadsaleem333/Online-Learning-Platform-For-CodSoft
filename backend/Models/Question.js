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
    marks: {
        type: Number
    }
});


const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;