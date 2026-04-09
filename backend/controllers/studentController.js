const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.registerStudent = async (req, res) => {

  const { name, email, password, course } = req.body;

  try {

    const existing = await Student.findOne({ email });

    if (existing) {
      return res.json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Student.create({
      name,
      email,
      password: hashedPassword,
      course
    });

    res.json({ message: "Registration successful" });

  } catch (error) {
    res.status(500).json(error);
  }

};



// LOGIN
exports.loginStudent = async (req, res) => {

  const { email, password } = req.body;

  try {

    const student = await Student.findOne({ email });

    if (!student) {
      return res.json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      student
    });

  } catch (error) {
    res.status(500).json(error);
  }

};



// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {

  const { oldPassword, newPassword } = req.body;

  try {

    const student = await Student.findById(req.student.id);

    const match = await bcrypt.compare(oldPassword, student.password);

    if (!match) {
      return res.json({ message: "Old password incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    student.password = hashed;

    await student.save();

    res.json({ message: "Password Updated" });

  } catch (error) {
    res.status(500).json(error);
  }

};



// UPDATE COURSE
exports.updateCourse = async (req, res) => {

  const { course } = req.body;

  try {

    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { course },
      { new: true }
    );

    res.json(student);

  } catch (error) {
    res.status(500).json(error);
  }

};