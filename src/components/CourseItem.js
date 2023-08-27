import React from 'react'
import { Link } from 'react-router-dom';

export default function CourseItem(props) {
    const { course } = props;
    return (
        <div className="col-md-3">
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column h-100">
                            <h5 className="card-title">{course.name}</h5>
                            <p className="card-text">{course.description}</p>
                            <p className="card-text"><small className="text-muted">By {course.instructor.name} </small></p>
                            <Link className="btn-primary btn" to ={`/courseaddition/${course._id}`}>Add and Publish</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
