import './App.css';
import CourseAddition from './components/CourseAddition';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import MyCourses from './components/MyCourses';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/createcourse" element={<CreateCourse />} />
          <Route path="/myCourses" element={<MyCourses />} />
          <Route path="/courseaddition/:id" element={<CourseAddition />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
