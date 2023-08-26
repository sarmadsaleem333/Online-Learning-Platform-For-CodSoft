import React, { useContext, useEffect, useRef, useState } from 'react'
import courseContext from '../context/course/courseContext';
import alertContext from '../context/alert/alertContext';
import { useParams } from 'react-router-dom';
import QuizMake from './QuizMake';
export default function CourseAddition(props) {
    const closeRef = useRef(null);
    const closeRef2 = useRef(null);
    const { courseId } = useParams();
    const context = useContext(courseContext);
    const { getSpecificNonPublishedCourse, specificNonPublishedCourse, uploadLecture } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    const [lectureCredentials, setlectureCredentials] = useState({ topic: "", content: "" });
    useEffect(() => {
        getSpecificNonPublishedCourse(courseId);
    }, [])

    const onChange = (e) => {
        setlectureCredentials({ ...lectureCredentials, [e.target.name]: e.target.value });
    }

    const onVideoChange = (e) => {
        setlectureCredentials({ ...lectureCredentials, content: e.target.files[0] });
    }

    const submitLecture = async (e) => {
        e.preventDefault();
        if (lectureCredentials.topic === "" || lectureCredentials.content === "") {
            closeRef.current.click();
            setlectureCredentials({ topic: "", content: "" });
            return showAlert("Please fill the required fields", "danger");

        }
        const formData = new FormData();
        formData.append("lecture", lectureCredentials.content);
        formData.append("topic", lectureCredentials.topic);
        const message = await uploadLecture(courseId, formData);
        setlectureCredentials({ topic: "", content: "" });
        showAlert(message, "success");
        closeRef.current.click();
    }
    return (
        <>
            <div class="modal fade" id="uploadquizModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header my-3">
                        <h5 class="modal-title">Upload Quiz</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div>
                        <QuizMake />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" ref={closeRef2} data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" >Upload Quiz</button>
                    </div>
                </div>
            </div>
            </div>

            <div class="modal fade" id="uploadLectureModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header my-3">
                        <h5 class="modal-title">Upload Lecture</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Topic of Lecture</label>
                        <input className="form-control" name='topic' value={lectureCredentials.topic} onChange={onChange} />
                    </div>
                    <div class="modal-body">
                        <input type="file" accept="video/*" onChange={onVideoChange} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={submitLecture}>Upload Lecture</button>
                    </div>
                </div>
            </div>
            </div>
            {
                specificNonPublishedCourse === null ? "" :
                    <>
                        <div className='d-flex flex-column  align-items-center'>
                            <h1 className='my-3'>Course Name: {specificNonPublishedCourse.name}</h1>
                            <h5 className='my-3'>Descripiton: {specificNonPublishedCourse.description}</h5>
                            <h6 className='my-3'>Course Instructor: Prof. {specificNonPublishedCourse.instructor.name}</h6>
                        </div >
                        <div className='d-flex justify-content-center my-3'>
                            <div className="btn btn-info mx-3" data-bs-toggle="modal" data-bs-target="#uploadLectureModal" >Upload Lecture</div>
                            <div className="btn btn-info mx-3" data-bs-toggle="modal" data-bs-target="#uploadquizModal">Upload Quiz</div>
                        </div>
                        <div className="container">
                            <h4 className="text-center my-3">Lectures</h4>
                            <div className="row">
                                {specificNonPublishedCourse.lectures.length === 0 ? (
                                    <p className="text-center">No lectures uploaded.</p>
                                ) : (
                                    specificNonPublishedCourse.lectures.map((lecture) => (
                                        <div className="col-md-4" key={lecture._id}>
                                            <div className="card mb-3">
                                                <div className="row g-0">
                                                    <div className="col-md-12">
                                                        <video controls width="100%">
                                                            <source src={`http://localhost:3333/videos/${lecture.content}`} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="card-body d-flex flex-column h-100">
                                                            <h5 className="card-title">{lecture.topic}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="container">
                            <h4 className="text-center my-3">Quizzes</h4>
                            <div className="row">
                                {specificNonPublishedCourse.lectures.length === 0 ? (
                                    <p className="text-center">No lectures uploaded.</p>
                                ) : (
                                    specificNonPublishedCourse.lectures.map((lecture) => (
                                        <div className="col-md-4" key={lecture._id}>
                                            <div className="card mb-3">
                                                <div className="row g-0">
                                                    <div className="col-md-12">
                                                        <video controls width="100%">
                                                            <source src={`http://localhost:3333/videos/${lecture.content}`} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="card-body d-flex flex-column h-100">
                                                            <h5 className="card-title">{lecture.topic}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </>
            }


        </>
    )
}
