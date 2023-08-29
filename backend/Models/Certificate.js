const mongoose = require("mongoose");
const { Schema } = mongoose;
const CertificateSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    course: {
        type: String,
    },
    user: {
        type: String,
    },
    instructor: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    result: {
        type: Number,
    },
    status:{
        type:String
    },
    message: {
        type: String,
    }
});

const Certificate = mongoose.model("Certificate", CertificateSchema);
module.exports = Certificate;