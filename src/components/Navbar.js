import React, { useContext, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import alertContext from '../context/alert/alertContext';

export default function Navbar() {
    let navigate = useNavigate();
    let closeRef = useRef(null);
    let location = useLocation();
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
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        closeRef.current.click();
        showAlert("You logged out from your account", "danger");
    }

    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Logging Out</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Are You sure you want to Log Out?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">No</button>
                            <button type="button" class="btn btn-primary" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <a className="navbar-brand display-1" href=" #">MSS Courses</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {localStorage.getItem("token") && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active " aria-current="page" to="/">Courses</Link>
                                </li>
                                {userRole === "instructor" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active " aria-current="page" to="/myCourses">My Courses</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link active " aria-current="page" to="/createcourse">Create Course</Link>
                                        </li>
                                    </>)

                                }
                                {userRole === "user" && (
                                    <li className="nav-item">
                                        <Link className="nav-link active " aria-current="page" to="/myenrolledcourses">Enrolled Courses</Link>
                                    </li>)
                                }

                            </ul>
                        )}
                        {location.pathname !== "/login" && location.pathname !== "/signup" && (
                            <div className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Log Out</div>
                        )
                        }

                    </div>
                </div>
            </nav>
        </>

    )
}
