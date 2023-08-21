const connectToMongo = require("./db");
const express = require("express");
const app = express();                    //making imports 
var cors = require("cors");
const port = 3333;
const path = require('path');


connectToMongo();                 //connecting to MongoDb database 

app.use(express.json());
app.use(cors());
app.use('/learning-platform/user-auth', require('./Routes/user-auth'));       //providing route for  user authentication 
app.use('/learning-platform/instructor-auth', require('./Routes/instructor-auth'));       //providing route for instructor authentication 
// app.use('/learning-platform/course-uploading', require('./Routes/course-uploading'));      //course making by the instructor
// app.use('/blogging/reaction', require('./Routes/reaction'));       //providing route for reaction
// app.use('/blogging/search', require('./Routes/search'));  // providing route for searching
app.use(express.static(path.resolve(__dirname, './public')));  //path for videos images and pdfs upload 

app.listen(port, () => {
    console.log(`The Online Learning Platform is listening on port http://localhost:${port}`);
});
