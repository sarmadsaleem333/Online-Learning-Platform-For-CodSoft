import React, { useContext, useEffect } from 'react'
import courseContext from '../context/course/courseContext'
import alertContext from '../context/alert/alertContext';
import CourseItem from './CourseItem';
import { useNavigate } from 'react-router-dom';

export default function Courses() {
    let navigate = useNavigate();
    const context = useContext(courseContext);
    const { allPublishedCourses, getPublishedCoursesByUser } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    useEffect(() => {
        if (localStorage.getItem("token")) {

            getPublishedCoursesByUser();
        }
        else {
            navigate("/login");
        }
    }, [])

    return (
        <div className="row my-3">
            <h4>All Courses</h4>
            {allPublishedCourses === null ? (
                <div>No In Progress Courses</div>
            ) : allPublishedCourses.length === 0 ? (
                <div>No In Progress Courses</div>
            ) : (
                allPublishedCourses.map((course) => (
                    <CourseItem key={course._id} course={course} enroll={true} />
                ))
            )}

        </div>
    )
}
