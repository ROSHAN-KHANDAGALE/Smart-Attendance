const express = require("express");
const router = express.Router();
const {
  createSubjects,
  createStudents,
  createClass,
  createTeacher,
  createDepartment,
} = require("../controllers/Create");

router.post("/createSubject/:id", createSubjects);
router.post("/createStudent/:Did/:Cid", createStudents);

router.post("/createTeacher/:id", createTeacher);
router.post("/createClass/:id", createClass);

router.post("/createDepartment", createDepartment);
module.exports = router;
