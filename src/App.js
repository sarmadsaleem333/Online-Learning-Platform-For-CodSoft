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
import CourseStudy from './components/CourseStudy';
import EnrolledCourses from './components/EnrolledCourses';
import Signup from './components/SignUp';
import Login from './components/Login';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {
 
  const [userRole, setUserRole] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.instructor ? 'instructor' : 'user');
    } else {
      setUserRole('');
    }
  }, [token]);





  return (
    <>
      <CourseState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <Routes>
              <Route path="/" element={<Courses />} />


              {userRole === "instructor" && (
                <>
                  <Route path="/createcourse" element={<CreateCourse />} />
                  <Route path="/courseaddition/:courseId" element={<CourseAddition />} />
                  <Route path="/myCourses" element={<MyCourses />} />

                </>
              )
              }
              {userRole === "user" && (
                <>
                  <Route path="/myenrolledcourses" element={<EnrolledCourses />} />
                  <Route path="/coursestudy/:courseId" element={<CourseStudy />} />
                </>

              )}

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AlertState>
      </CourseState >
    </>
  );
}


export default App;
