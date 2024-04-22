const express = require("express");
const router = express.Router();

const { getAllDepartments } = require("../controllers/principle/get");

const {
  getAllClass,
  getAllSubjectsOfClass,
  getAllStudentOfClass,
} = require("../controllers/Common");
const {
  generateQRId,
  attendance,
} = require("../controllers/students/attendance");
const { student } = require("../controllers/students/student");
// Principle Routes
router.get("/principle/departments", getAllDepartments);

// Common Routes
router.get("/department/class/:id", getAllClass);
router.get("/department/class/subjects/:id", getAllSubjectsOfClass);
router.get(
  "/department/class/subjects/students/:id/:Sid",
  getAllStudentOfClass
);

router.get("/generateAttendanceToken/:id", generateQRId);
router.get("/student", student);

router.post("/attendance/:token", attendance);

module.exports = router;
