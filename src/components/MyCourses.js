import React, { useContext, useState } from 'react'
import courseContext from '../context/course/courseContext'
import alertContext from '../context/alert/alertContext';

export default function MyCourses() {
    const context = useContext(courseContext);
    const { createCourse } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    
    return (
        <div>MyCourses</div>
    )
}
