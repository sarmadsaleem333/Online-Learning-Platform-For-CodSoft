const mongoose = require("mongoose");
const { Schema } = mongoose;
const LectureSchema = new Schema({
    topic:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }

});

const Lecture = mongoose.model("lecture-learning-platform", LectureSchema);
module.exports = Lecture;