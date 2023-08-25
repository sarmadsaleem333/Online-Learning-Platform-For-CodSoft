import React from 'react'

export default function CreateCourse() {
    return (
        <div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name of Course</label>
                    <input  className="form-control"  />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Description of Course</label>
                    <input  className="form-control"  />
                </div>
        </div>
    )
}
