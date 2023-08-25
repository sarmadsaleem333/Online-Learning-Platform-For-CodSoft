import React, { useState } from 'react'
import courseContext from './courseContext'

const CourseState = (props) => {
    const host = "http://localhost:3333";

    
    const createCourse = async(name,description) => {
        const response = await fetch(`${host}/learning-platform/course/courseupload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0cnVjdG9yIjp7ImlkIjoiNjRlNGFlZDlmODg4NzQ0N2IyZjJhYzliIn0sImlhdCI6MTY5Mjk4NDMyNn0.NdmoLRSl_tbioVBJp9Y3X3jyLLhO9EbT185_fN8vEoA"
            },
            body: JSON.stringify({ name,description })
        });
        const json = await response.json();
        return json;
    }

    return (
        <courseContext.Provider value={{createCourse}} >
            {props.children}
        </courseContext.Provider>
    )
}

export default CourseState;