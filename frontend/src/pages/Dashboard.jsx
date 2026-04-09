import {useState,useEffect} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function Dashboard(){

const navigate = useNavigate();

const [student,setStudent] = useState(null);
const [course,setCourse] = useState("");
const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");

useEffect(()=>{

const data = localStorage.getItem("student");

if(!data){
navigate("/login");
return;
}

setStudent(JSON.parse(data));

},[]);


const updateCourse = async ()=>{

const res = await API.put("/update-course",{course});

setStudent(res.data);

localStorage.setItem("student",JSON.stringify(res.data));

alert("Course updated");

}


const updatePassword = async ()=>{

await API.put("/update-password",{oldPassword,newPassword});

alert("Password updated");

}


const logout = ()=>{

localStorage.clear();

navigate("/login");

}


if(!student){
return <h2>Loading...</h2>
}

return(

<div className="dashboard-box">

<h2>Student Dashboard</h2>

<p><b>Name:</b> {student.name}</p>
<p><b>Email:</b> {student.email}</p>
<p><b>Course:</b> {student.course}</p>

<hr/>

<h4>Update Course</h4>

<input
placeholder="New Course"
onChange={(e)=>setCourse(e.target.value)}
/>

<button onClick={updateCourse}>Update Course</button>

<hr/>

<h4>Update Password</h4>

<input
type="password"
placeholder="Old Password"
onChange={(e)=>setOldPassword(e.target.value)}
/>

<input
type="password"
placeholder="New Password"
onChange={(e)=>setNewPassword(e.target.value)}
/>

<button onClick={updatePassword}>Update Password</button>

<hr/>

<button onClick={logout}>Logout</button>

</div>

)

}

export default Dashboard;