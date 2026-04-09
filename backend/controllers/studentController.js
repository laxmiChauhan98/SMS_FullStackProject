const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.registerStudent = async (req,res)=>{

const {name,email,password,course} = req.body;

const existing = await Student.findOne({email});

if(existing){
return res.json({message:"Student already exists"});
}

const hashed = await bcrypt.hash(password,10);

await Student.create({
name,
email,
password:hashed,
course
});

res.json({message:"Registration successful"});

}



// LOGIN
exports.loginStudent = async (req,res)=>{

const {email,password} = req.body;

const student = await Student.findOne({email});

if(!student){
return res.json({message:"Invalid email"});
}

const match = await bcrypt.compare(password,student.password);

if(!match){
return res.json({message:"Invalid password"});
}

const token = jwt.sign(
{ id: student._id },
process.env.JWT_SECRET,
{expiresIn:"1d"}
);

res.json({
token,
student
});

}



// UPDATE PASSWORD
exports.updatePassword = async (req,res)=>{

const {oldPassword,newPassword} = req.body;

const student = await Student.findById(req.student.id);

const match = await bcrypt.compare(oldPassword,student.password);

if(!match){
return res.json({message:"Old password incorrect"});
}

const hashed = await bcrypt.hash(newPassword,10);

student.password = hashed;

await student.save();

res.json({message:"Password Updated"});

}



// UPDATE COURSE
exports.updateCourse = async (req,res)=>{

const {course} = req.body;

const student = await Student.findByIdAndUpdate(
req.student.id,
{course},
{new:true}
);

res.json(student);

}