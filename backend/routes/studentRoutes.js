const express = require("express");
const router = express.Router();

const {
registerStudent,
loginStudent,
updatePassword,
updateCourse
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerStudent);
router.post("/login", loginStudent);

router.put("/update-password", authMiddleware, updatePassword);
router.put("/update-course", authMiddleware, updateCourse);

module.exports = router;