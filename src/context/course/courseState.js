
import React, { useState } from 'react'
import courseContext from './courseContext'

const CourseState = (props) => {
    const host = "http://localhost:3333";
    const [nonPublishedCourses, setNonPublishedCourses] = useState(null);
    const [PublishedCourses, setPublishedCourses] = useState(null);

    const createCourse = async (name, description) => {
        const response = await fetch(`${host}/learning-platform/course/courseupload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0cnVjdG9yIjp7ImlkIjoiNjRlNGFlZDlmODg4NzQ0N2IyZjJhYzliIn0sImlhdCI6MTY5Mjk4NDMyNn0.NdmoLRSl_tbioVBJp9Y3X3jyLLhO9EbT185_fN8vEoA"
            },
            body: JSON.stringify({ name, description })
        });
        const json = await response.json();
        return json;
    }

    const getMyAllNonPublishedCourses = async () => {
        const response = await fetch(`${host}/learning-platform/course/allnonpublishedcourses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0cnVjdG9yIjp7ImlkIjoiNjRlNGFlZDlmODg4NzQ0N2IyZjJhYzliIn0sImlhdCI6MTY5Mjk4NDMyNn0.NdmoLRSl_tbioVBJp9Y3X3jyLLhO9EbT185_fN8vEoA"
            }
        });
        const json = await response.json();
        setNonPublishedCourses(json);
    }

    const getMyAllPublishedCourses = async () => {
        const response = await fetch(`${host}/learning-platform/course/allpublishedcourses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0cnVjdG9yIjp7ImlkIjoiNjRlNGFlZDlmODg4NzQ0N2IyZjJhYzliIn0sImlhdCI6MTY5Mjk4NDMyNn0.NdmoLRSl_tbioVBJp9Y3X3jyLLhO9EbT185_fN8vEoA"
            }
        });
        const json = await response.json();
        setPublishedCourses(json);
    }

    return (
        <courseContext.Provider value={{ createCourse, getMyAllNonPublishedCourses, nonPublishedCourses, PublishedCourses, getMyAllPublishedCourses }} >
            {props.children}
        </courseContext.Provider>
    )
}

export default CourseState;