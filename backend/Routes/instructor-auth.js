const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Instructor = require("../Models/Instructor");
const fetchinstructor = require("../Middleware/fetchinstructor");
let multer = require('multer')

const JWT_secret = "MSS Online Learning Platform instructors"



// storing images and pdfs in the folder using multer and storing their name in data base
var pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "backend/public/pdfs/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})
var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "backend/public/images/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
});

const uploadPdf = multer({ storage: pdfStorage })
const uploadImage = multer({ storage: imageStorage })
//Route 1:Create a instructor using Post request"/learning-platform/instructor-auth/createinstructor".No login required

router.post("/createinstructor", [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone number").isLength({ min: 11 }),
    body("password", "Password should be atleast 8 characters").isLength({ min: 8 }),
    body("field", "Write your specific domain here ").notEmpty(),


],uploadPdf.single("pdf"), uploadImage.single("image"), async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        //checking if the instructor exists or not
        let instructor = await Instructor.findOne({ email: req.body.email })
        if (instructor) {
            return res.status(400).json({ success, error: "Sorry a instructor with this email  already exists" })
        }
        instructor = await Instructor.findOne({ phone: req.body.phone })
        if (instructor) {
            return res.status(400).json({ success, error: "Sorry a instructor with this phone number already exists" })
        }

        //  hashing the password by using bcrypt.js
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        if (req.file.fieldname === "image") {
            const photoName = req.file.filename;
        }
        if (req.file.fieldname === "pdf") {
            const pdfName = req.file.filename;
        }
        instructor = await Instructor.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone,
            field: req.body.field,
            cv: pdfName,
            photo: photoName

        });
        const data = {
            instructor: {
                id: instructor.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.log("Error: " + error.message);
    }

});

//Route 2:Login instructor using Post request"/learning-platform/instructor-auth/logininstructor".Login required

router.post("/logininstructor", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Please enter a password").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    // if there are errors return the bad request
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);

    }

    try {
        const { email, password } = req.body;
        let instructor = await Instructor.findOne({ email });
        if (!instructor) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, instructor.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            instructor: {
                id: instructor.id
            }

        };
        const authtoken = jwt.sign(data, JWT_secret);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.log("Error: " + error.message);
    }
});


//Router 3: Get instructor details by Post request"/learning-platform/instructor-auth/fetchinstructor" and providing token.Log in required.

router.get("/fetchinstructor", fetchinstructor, async (req, res) => {
    try {
        let instructorId = req.instructor.id;
        const instructor = await Instructor.findOne({ _id: instructorId }).select("-password");
        res.send(instructor);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error occured");
    }
});
//Router 3: Get instructor details by Post request"/learning-platform/instructor-auth/fetchspecificinstructor/:id" and providing token.Log in required.

router.get("/fetchspecificinstructor/:id", fetchinstructor, async (req, res) => {
    try {
        let instructorId = req.params.id;
        const instructor = await Instructor.findOne({ _id: instructorId }).select("-password");
        res.send(instructor);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error occured");
    }
});





module.exports = router;