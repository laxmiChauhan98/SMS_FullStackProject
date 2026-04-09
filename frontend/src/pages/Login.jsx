import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await API.post("/login",{email,password});

      if(res.data.token && res.data.student){

        localStorage.setItem("token",res.data.token);
        localStorage.setItem("student",JSON.stringify(res.data.student));

        navigate("/dashboard");

      }else{
        alert("Login failed");
      }

    }
    catch(error){
      console.log(error);
      alert("Server error during login");
    }

  };

  return(

  <div className="container">

  <h2>Login</h2>

  <input
  placeholder="Email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  />

  <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  />

  <button onClick={handleLogin}>Login</button>

  </div>

  );

}

export default Login;