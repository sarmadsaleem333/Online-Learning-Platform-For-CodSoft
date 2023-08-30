import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import alertContext from '../context/alert/alertContext';
import { Link } from 'react-router-dom';
export default function Signup() {
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", phone: "", confirmPassword: "" });
    const [credentials2, setCredentials2] = useState({ vname: "", vemail: "", vpassword: "", vphone: "", vfield: "", vconfirmPassword: "" });
    const handleSubmit1 = async (e) => {
        if (credentials.password !== credentials.confirmPassword) {
            return showAlert("Your Password and Confirm Password did not match", "danger")
        }
        e.preventDefault();
        const response = await fetch("http://localhost:3333/learning-platform/user-auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, phone: credentials.phone, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            showAlert("Congratulations! Your Account has been created in MSS Courses as Student", "success");
            navigate("/");

        }
        else {
            showAlert(json.error, "danger")
        }
        setCredentials({ name: "", email: "", password: "", phone: "", confirmPassword: "" })

    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3333/learning-platform/instructor-auth/createinstructor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials2.vname, phone: credentials2.vphone, email: credentials2.vemail, password: credentials2.vpassword, field: credentials2.vfield })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            showAlert("Congratulations! Your Account has been created in MSS Courses as Instructor", "success")
            navigate("/");

        }
        else {
            showAlert(json.error, "danger")
        }
        setCredentials2({ vname: "", vemail: "", vpassword: "", vphone: "", vconfirmPassword: "", vfield: "" })

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const onChange2 = (e) => {
        setCredentials2({ ...credentials2, [e.target.name]: e.target.value });
    }
    return (
        <>
            {/* For user  */}
            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Sign Up as User</h3> </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" aria-label="First name" class="form-control" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Phone</span>
                    <input type="text" aria-label="First name" class="form-control" name='phone' value={credentials.phone} onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit1}>Create Account</button>
                </div>
            </div>

            {/* for vendor */}
            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Sign Up as Instructor</h3> </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" aria-label="First name" class="form-control" name='vname' value={credentials2.vname} onChange={onChange2} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='vemail' value={credentials2.vemail} onChange={onChange2} />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Phone</span>
                    <input type="text" aria-label="First name" class="form-control" name='vphone' value={credentials2.vphone} onChange={onChange2} />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Field</span>
                    <input type="text" aria-label="First name" class="form-control" name='vfield' value={credentials2.vfield} onChange={onChange2} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='vpassword' value={credentials2.vpassword} onChange={onChange2} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='vconfirmPassword' value={credentials2.vconfirmPassword} onChange={onChange2} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit2}>Create Account</button>
                </div>
                <Link className='align-self-center my-3 ' to="/login">Already have an Account Log In</Link>
            </div>
        </>
    )
}