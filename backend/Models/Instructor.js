const mongoose = require("mongoose");
const { Schema } = mongoose;
const InstructorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    field: {
        type: String,
        required: true
    },
    cv: {
        type: String,
    },
    photo: {
        type: String,
    }
});

const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;