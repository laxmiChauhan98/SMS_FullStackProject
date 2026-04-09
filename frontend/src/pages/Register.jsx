import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register(){

const navigate = useNavigate();

const [form,setForm]=useState({
name:"",
email:"",
password:"",
course:""
})

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const registerStudent = async ()=>{

try{

await API.post("/register",form)

alert("Registration successful")

navigate("/login")

}
catch(error){

alert(error.response?.data?.message || "Registration failed")

}

}

return(

<div className="container mt-5">

<h2>Student Registration</h2>

<input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange}/>

<input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange}/>

<input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange}/>

<input className="form-control mb-2" name="course" placeholder="Course" onChange={handleChange}/>

<button className="btn btn-primary" onClick={registerStudent}>Register</button>

<p className="mt-3">
Already Registered? <a href="/login">Login</a>
</p>

</div>

)

}

export default Register