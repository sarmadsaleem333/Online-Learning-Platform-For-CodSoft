import React, { useContext, useEffect, useState } from 'react'
import courseContext from '../context/course/courseContext'
import alertContext from '../context/alert/alertContext';
import CourseItem from './CourseItem';

export default function MyCourses() {
    const context = useContext(courseContext);
    const { getMyAllNonPublishedCourses, nonPublishedCourses } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    useEffect(() => {
        getMyAllNonPublishedCourses();
    }, [])
    return (
        <div className="row my-3">
            <h4 >My In Progress Courses</h4>
            {nonPublishedCourses === null ? (
                <div>No In Progress Courses</div>
            ) : nonPublishedCourses.length === 0 ? (
                <div>No In Progress Courses</div>
            ) : (
                nonPublishedCourses.map((course) => (
                    <CourseItem key={course.id} course={course} />
                ))
            )}
        </div>



    )
}
