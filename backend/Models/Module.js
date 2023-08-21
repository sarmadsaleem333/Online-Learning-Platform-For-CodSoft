const mongoose = require("mongoose");
const { Schema } = mongoose;
const ModuleSchema = new Schema({
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
    }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    }],

});

const Module = mongoose.model("module-learning-platform", ModuleSchema);
module.exports = Module;