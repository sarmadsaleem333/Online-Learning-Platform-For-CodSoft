import React, { useContext, useEffect } from 'react';
import courseContext from '../context/course/courseContext';
import alertContext from '../context/alert/alertContext';
import { useParams } from 'react-router-dom';
import AttemptQuiz from './AttemptQuiz';
import { Link } from 'react-router-dom';
import Progress from './Progress';

export default function CourseStudy() {
    const { courseId } = useParams();
    const context = useContext(courseContext);
    const { specifiedCourse, getSpecifiedCourse } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;

    useEffect(() => {
        getSpecifiedCourse(courseId);
    }, []);

    return (
        <div>

            {specifiedCourse === null ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='my-3'>Course Name: {specifiedCourse.name}</h1>
                        <h5 className='my-3'>Description: {specifiedCourse.description}</h5>
                        <h6 className='my-3'>Course Instructor: Prof. {specifiedCourse.instructor.name}</h6>
                    </div>
                    <div className="container">
                        <h4 className="text-center my-3">Lectures</h4>
                    <div className='btn-primary btn my-3 text-center'data-bs-toggle="modal" data-bs-target="#certificate" >My Progress  </div>

                        <div className="row">
                            {specifiedCourse.lectures.length === 0 ? (
                                <p className="text-center">No lectures uploaded.</p>
                            ) : (
                                specifiedCourse.lectures.map((lecture) => (
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
                            {specifiedCourse.quizzes.length === 0 ? (
                                <p className="text-center">No Quizzes uploaded.</p>
                            ) : (
                                specifiedCourse.quizzes.map((quiz) => (
                                    <>
                                        <div className="col-md-4" key={quiz._id}>
                                            <div className="card mb-3">
                                                <div className="row g-0">
                                                    <div className="col-md-12">

                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="card-body d-flex flex-column h-100">
                                                            <div className="btn-primary btn" data-bs-toggle="modal" data-bs-target={`#quiz__${quiz._id}`}>{quiz.topic}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" id={`quiz__${quiz._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <AttemptQuiz quizId={quiz._id} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="certificate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                   <Progress courseId={courseId}/>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                ))
                            )}
                        </div>
                    </div>

                </>
            )}
        </div>
    );
}
