import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
import { Link } from 'react-router-dom';
export default function Login() {
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [credentials2, setCredentials2] = useState({ vemail: "", vpassword: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const onChange2 = (e) => {
        setCredentials2({ ...credentials2, [e.target.name]: e.target.value });
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3333/learning-platform/user-auth/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            showAlert("You logged in as User", "success");
            navigate("/");
        }
        else {
            showAlert("You entered Invalid Credentials","danger")
        }
        setCredentials({  email:"",password: ""})

    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3333/learning-platform/instructor-auth/logininstructor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials2.vemail, password: credentials2.vpassword })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            showAlert("You logged in as Instructor", "success")
            navigate("/");


        }
        else {
            showAlert("You entered Invalid Credentials","danger")
        }
        setCredentials2({  vemail: "",vpassword: ""})

    }
    return (
        <>
            {/* For user  */}
            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Login as User</h3> </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" name='email' id="exampleInputEmail1" value={credentials.email} baaria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' value={credentials.password} class="form-control" id="exampleInputPassword1" onChange={onChange} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit1}> Login </button>
                </div>
            </div>

            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Login as Instructor</h3> </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" name='vemail' id="exampleInputEmail1" value={credentials2.vemail} baaria-describedby="emailHelp" onChange={onChange2} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='vpassword' value={credentials2.vpassword} class="form-control" id="exampleInputPassword1" onChange={onChange2} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit2}> Login </button>
                </div>
                <Link className='align-self-center my-3 ' to="/signup">Don't have an account Sign Up</Link>

            </div>


        </>
    )
}