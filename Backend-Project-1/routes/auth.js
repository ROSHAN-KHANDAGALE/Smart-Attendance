const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
// const {
//   superAdminLogin,
//   superAdminRegister,
//   superAdminCreate,
// } = require("../controllers/superAdmin/auth");
const {
  principleLogin,
  principleChangePass,
} = require("../controllers/principle/auth");

const { hodLogin } = require("../controllers/hod/auth");
const { teacherLogin } = require("../controllers/teacher/auth");

const {
  studentLogin,
  studentChangePass,
} = require("../controllers/students/auth");

const { hodTeacherChangePass } = require("../controllers/Common");
// SuperAdmin Routes
// router.post("/superAdminLogin", superAdminLogin);
// router.post("/superAdminRegister", authenticateUser, superAdminRegister);
// router.post("/superAdminCreate", authenticateUser, superAdminCreate);
// Principle Routes
router.post("/principleLogin", principleLogin);
router.put("/principleChangePass", authenticateUser, principleChangePass);
// HOD Routes
router.post("/hodLogin", hodLogin);
// Teachers Routes
router.post("/teacherLogin", teacherLogin);
// Students Routes
router.post("/studentLogin", studentLogin);
router.put("/studentChangePass", authenticateUser, studentChangePass);
// Common Routes
router.put("/hodTeacherChangePass", authenticateUser, hodTeacherChangePass);
module.exports = router;
