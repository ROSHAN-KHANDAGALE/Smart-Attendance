const express = require("express");
const router = express.Router();
const {
  hodTeacherUpdateProfile,
  getAllFaculty,
  getFaculty,
} = require("../controllers/Common");

router.patch("/updateprofile/:id", hodTeacherUpdateProfile);
router.get("/getAllFaculty/:id", getAllFaculty);
router.get("/getFaculty/:id", getFaculty);
module.exports = router;
