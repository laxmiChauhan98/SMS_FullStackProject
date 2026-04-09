import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate = useNavigate();

const [student,setStudent] = useState(null);
const [course,setCourse] = useState("");
const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");

useEffect(()=>{

const data = localStorage.getItem("student");

if(!data || data === "undefined"){
  localStorage.clear();
  navigate("/login");
  return;
}

try{

const parsedStudent = JSON.parse(data);

setStudent(parsedStudent);

}catch(error){

console.log("Invalid student data");

localStorage.clear();

navigate("/login");

}

},[]);



const updateCourse = async ()=>{

try{

const res = await API.put("/update-course",{course});

setStudent(res.data);

localStorage.setItem("student",JSON.stringify(res.data));

alert("Course updated");

}catch(error){

console.log(error);
alert("Error updating course");

}

};



const updatePassword = async ()=>{

try{

await API.put("/update-password",{oldPassword,newPassword});

alert("Password updated");

}catch(error){

console.log(error);
alert("Error updating password");

}

};



const logout = ()=>{

localStorage.clear();

navigate("/login");

};



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
value={course}
onChange={(e)=>setCourse(e.target.value)}
/>

<button onClick={updateCourse}>Update Course</button>

<hr/>

<h4>Update Password</h4>

<input
type="password"
placeholder="Old Password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
/>

<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>

<button onClick={updatePassword}>Update Password</button>

<hr/>

<button onClick={logout}>Logout</button>

</div>

)

}

export default Dashboard;