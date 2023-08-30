import React, { useContext, useEffect } from 'react'
import alertContext from '../context/alert/alertContext';
import courseContext from '../context/course/courseContext';
import CourseItem from './CourseItem';

export default function EnrolledCourses() {
    const context = useContext(courseContext);
    const { getEnrolledCourses, EnrolledCourses } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    useEffect(() => {
        getEnrolledCourses();
    }, [])

    return (
        <div className="row my-3">
            <h4>All Courses</h4>
            {EnrolledCourses === null ? (
                <div>No In Progress Courses</div>
            ) : EnrolledCourses.length === 0 ? (
                <div>No In Progress Courses</div>
            ) : (
                EnrolledCourses.map((course) => (
                    <CourseItem key={course._id} course={course} enroll={false} enrolled={true} />
                ))
            )}
            

        </div>
    )
}
