import React, { useContext, useState } from 'react'
import courseContext from '../context/course/courseContext'
import alertContext from '../context/alert/alertContext';
export default function CreateCourse() {
    const context = useContext(courseContext);
    const { createCourse } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;

    const [courseCredentials, setCourseCredentials] = useState({ name: "", description: "" });

    const onChange = (e) => {
        setCourseCredentials({ ...courseCredentials, [e.target.name]: e.target.value });
    }

    const handleClick = async () => {
        if(courseCredentials.name==="" ||courseCredentials.description===""){
            return showAlert("Fill the required fields", "danger");
        }
        const response = await createCourse(courseCredentials.name, courseCredentials.description);
        setCourseCredentials({name:"",description:""});
        showAlert(response, "success");
    }
    return (
        <div className='my-4 mx-5'>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Name of Course</label>
                <input className="form-control" name='name' value={courseCredentials.name} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Description of Course</label>
                <input className="form-control" name='description' value={courseCredentials.description} onChange={onChange} />
            </div>
            <div>
                <button type="button" class="btn btn-info" onClick={handleClick}>Create Course</button>
            </div>
        </div>
    )
}
