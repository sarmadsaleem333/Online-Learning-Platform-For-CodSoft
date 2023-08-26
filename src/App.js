import './App.css';
import CourseAddition from './components/CourseAddition';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import MyCourses from './components/MyCourses';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
import AlertState from './context/alert/alertState';
import CourseState from './context/course/courseState';

function App() {
  return (
    <>
      <CourseState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/createcourse" element={<CreateCourse />} />
              <Route path="/myCourses" element={<MyCourses />} />
              <Route path="/courseaddition/:courseId" element={<CourseAddition />} />
            </Routes>
          </BrowserRouter>
        </AlertState>
      </CourseState>
    </>
  );
}


export default App;
