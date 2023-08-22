const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
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
    myCourses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'UserCourse'
        }
    ],
    
});

const User = mongoose.model("User", UserSchema);
module.exports = User;