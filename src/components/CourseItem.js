import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
import courseContext from '../context/course/courseContext';
import jwt_decode from 'jwt-decode';
export default function CourseItem(props) {
    const { course, enroll, enrolled } = props;
    const closeRef = useRef(null);
    const context = useContext(courseContext);
    const { enrollCourse } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    let userRole;
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = jwt_decode(token);
        userRole = decodedToken.instructor ? 'instructor' : 'user';
    }
    else {
        userRole = ""
    }
    const handleEnroll = async (id) => {
        const response = await enrollCourse(id);
        closeRef.current.click();
        showAlert(response, "success");

    }

    return (
        <>
            <div class="modal fade" id={`enroll__${course._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Course Enrollment Verification</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            You are enrolling to {course.name} course
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => handleEnroll(course._id)}>Enroll</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                {console.log(course)}
                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body d-flex flex-column h-100">
                                <h5 className="card-title">{course.name}</h5>
                                <p className="card-text">{course.description}</p>
                                <p className="card-text"><small className="text-muted">By {course.instructor.name} </small></p>

                                { userRole=="user" && enroll ?
                                    <Link className="btn-primary btn" data-bs-toggle="modal" data-bs-target={`#enroll__${course._id}`}>Enroll</Link>
                                    :
                                    userRole=="user" && enrolled ?
                                        <Link className="btn-primary btn" to={`/coursestudy/${course._id}`}>Study</Link>
                                        :
                                        <Link className="btn-primary btn" to={`/courseaddition/${course._id}`}>Add and Publish</Link>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}