const mongoose = require("mongoose");
const { Schema } = mongoose;
const CertificateSchema = new Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PublishedCourse',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',

    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }
});

const Certificate = mongoose.model("Certificate", CertificateSchema);
module.exports = Certificate;