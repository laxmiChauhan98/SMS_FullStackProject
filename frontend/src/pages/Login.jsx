import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const loginStudent = async ()=>{

try{

const res = await API.post("/login",{
email,
password
})
localStorage.setItem("token",res.data.token)

navigate("/dashboard")

}
catch{

alert("Invalid login credentials")

}

}

return(

<div className="container mt-5">

<h2>Student Login</h2>

<input
className="form-control mb-2"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="form-control mb-2"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="btn btn-success" onClick={loginStudent}>
Login
</button>

<p className="mt-3">
New Student? <a href="/register">Register</a>
</p>

</div>

)

}

export default Login