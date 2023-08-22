const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Instructor = require("../Models/Instructor");
const fetchinstructor = require("../Middleware/fetchinstructor");
let multer = require('multer');
const Course = require("../Models/Course");
const Lecture = require("../Models/Lecture");
const Quiz = require("../Models/Quiz");
const Question = require("../Models/Question");
const Option = require("../Models/Option");
const PublishedCourse = require("../Models/PublishedCourse");

var videosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "backend/public/videos/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
});

const uploadVideos = multer({ storage: videosStorage });

//Route 1 : to upload a course by instructor who is logged in by post request using route "/learning-platform/course/courseupload"

router.post("/courseupload", fetchinstructor, [
    body("name", "Enter a valid name of atleast 5 letters").isLength({ min: 5 }),
    body("description", "Enter a valid description of atleast 10 letters").isLength({ min: 10 }),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        await Course.create({
            name: req.body.name,
            description: req.body.description,
            instructor: req.instructor.id
        });

        res.json("Your course has been made successfully, Now uplaod lectures and quizzes to publish it for students")

    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);

    }

});
// Route 2 : to upload lectures in by instructor who is logged in by post request using route "/learning-platform/course/lecturesupload/:id"
// here id is of course

router.post("/lecturesupload/:id", fetchinstructor, [
    body("topic", "Enter a valid topic of atleast 5 letters").isLength({ min: 5 }),
], uploadVideos.single("lecture"), async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const lectureName = req.file.filename;
        const lecture = await Lecture.create({
            topic: req.body.topic,
            content: lectureName,
        });

        course.lectures.push(lecture);
        await course.save();
        res.json("Successfully uploaded lecture")
    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);

    }

});

// Route 3: to upload quizzes in by instructor who is logged in by post request using route "/learning-platform/course/quizupload/:id"
// here id is of course

router.post("/quizupload/:id", fetchinstructor, async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        const questions = req.body.questions;
        if (questions.length !== 5) {
            return res.json("You have to add exactly 2 questions");
        }
        const newQuiz = await Quiz.create({
            topic: req.body.topic,
        });

        for (const questionData of questions) {
            const newQuestion = await Question.create({
                text: questionData.text,
            });

            for (const optionData of questionData.options) {
                const newOption = await Option.create({
                    text: optionData.text,
                    isCorrect: optionData.isCorrect
                });
                newQuestion.options.push(newOption);
            }
            await newQuestion.save();
            newQuiz.questions.push(newQuestion);
        }

        await newQuiz.save();
        course.quizzes.push(newQuiz);
        await course.save();

        res.json("Quiz successfully uploaded");


    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);

    }

});
// Route 4:  to publish the course for students to study 
// here id is of the course  

router.post("/publishcourse/:id", fetchinstructor, async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.json("No course found");
        }
        if (!(course.quizzes.length >= 5 && course.quizzes.length <= 8)) {
            return res.json("Please upload atleast 5 or maximum 8 quizzes");
        }
        if (!(course.lectures.length >= 10 && course.lectures.length <= 15)) {
            return res.json("Please upload atleast 10 or maximum 15 lectures");
        }
        await PublishedCourse.create({
            name: course.name,
            description: course.description,
            instructor: course.instructor,
            quizzes: course.quizzes,
            lectures: course.lectures,

        });

        await Course.findByIdAndDelete(req.params.id);
        res.json("Your course has been published");


    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);

    }
});


// Route 5://get  all non published courses of mine  ;
router.get("/allnonpublishedcourses", fetchinstructor, async (req, res) => {
    try {
        let course = await Course.find({ instructor: req.instructor.id });
        if (!course) {
            return res.json("No course found");
        }
        res.json(course);



    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);

    }
});
// Route 6://get  specific non published courses of mine  ;
router.get("/specificnonpublishedcourses/:id", fetchinstructor, async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.json("No course found");
        }
        res.json(course);

    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);
    }
});
// Route 7://get  specific  published courses of mine  ;
router.get("/specificnonpublishedcourses/:id", fetchinstructor, async (req, res) => {
    try {
        let course = await PublishedCourse.findById(req.params.id);
        if (!course) {
            return res.json("No course found");
        }
        res.json(course);

    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);
    }
});

// Route 8://get  all  published courses of mine  ;
router.get("/allnonpublishedcourses", fetchinstructor, async (req, res) => {
    try {
        let course = await PublishedCourse.find({ instructor: req.instructor.id });
        if (!course) {
            return res.json("No course found");
        }
        res.json(course);



    } catch (error) {
        res.status(400).json("Internal Server Errror Occured");
        console.log("Error: " + error.message);

    }
});









module.exports = router;