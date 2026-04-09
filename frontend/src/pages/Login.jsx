import {useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async ()=>{

const res = await API.post("/login",{email,password});

localStorage.setItem("token",res.data.token);
localStorage.setItem("student",JSON.stringify(res.data.student));

navigate("/dashboard");

}

return(

<div className="container">

<h2>Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Login</button>

</div>

)

}

export default Login;