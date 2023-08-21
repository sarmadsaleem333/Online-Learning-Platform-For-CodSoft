const mongoose = require("mongoose");
const { Schema } = mongoose;
const OptionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
});
const Option = mongoose.model("option-learning-platform", OptionSchema);
module.exports = Option;