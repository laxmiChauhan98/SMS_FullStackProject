import { useState } from "react";
import API from "../services/api";

function Dashboard(){

const [course,setCourse]=useState("")
const [oldPassword,setOldPassword]=useState("")
const [newPassword,setNewPassword]=useState("")

const updateCourse = async ()=>{

try{

await API.put("/update-course",{course})

alert("Course Updated")

}
catch{
alert("Course update failed")
}

}

const updatePassword = async ()=>{

try{

await API.put("/update-password",{
oldPassword,
newPassword
})

alert("Password Updated")

}
catch{
alert("Password update failed")
}

}

const logout = ()=>{
localStorage.removeItem("token")
window.location="/login"
}

return(

<div className="container mt-5">

<h2>Student Dashboard</h2>

<hr/>

<h4>Change Course</h4>

<input
className="form-control mb-2"
placeholder="New Course"
onChange={(e)=>setCourse(e.target.value)}
/>

<button className="btn btn-warning mb-3" onClick={updateCourse}>
Update Course
</button>

<hr/>

<h4>Update Password</h4>

<input
className="form-control mb-2"
type="password"
placeholder="Old Password"
onChange={(e)=>setOldPassword(e.target.value)}
/>

<input
className="form-control mb-2"
type="password"
placeholder="New Password"
onChange={(e)=>setNewPassword(e.target.value)}
/>

<button className="btn btn-primary mb-3" onClick={updatePassword}>
Update Password
</button>

<hr/>

<button className="btn btn-danger" onClick={logout}>
Logout
</button>

</div>

)

}

export default Dashboard