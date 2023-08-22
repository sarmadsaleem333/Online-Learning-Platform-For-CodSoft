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
const Option = mongoose.model("Option", OptionSchema);                                
module.exports = Option;                                