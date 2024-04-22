const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../../errors");
const AttendanceSchema = require("../../models/Attendance");
const jwt = require("jsonwebtoken");

const generateQRId = async (req, res) => {
  if (req.user.position == "HOD" || req.user.position == "Teacher") {
    const token = jwt.sign(
      { subjectID: req.params.id, teacherID: req.user.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME_ATTENDANCE,
      }
    );
    res.status(StatusCodes.OK).json(token);
  } else {
    throw new UnauthenticatedError("Unauthenticate User");
  }
};

const attendance = async (req, res) => {
  const { classID, departmentID } = req.body;
  try {
    const { subjectID, teacherID } = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );
    const currentDate = new Date()
      .toLocaleString("pt-PT", {
        timeZone: "Asia/Kolkata",
      })
      .split(",")[0];
    const alreadyPresent = await AttendanceSchema.findOne({
      studentID: req.user.userId,
      subjectID,
      date: currentDate,
    });
    if (alreadyPresent == null) {
      const data = await AttendanceSchema.create({
        date: currentDate,
        subjectID,
        studentID: req.user.userId,
        teacherID,
        classID,
        departmentID,
      });
      res.status(StatusCodes.OK).json(data);
    } else {
      res.status(200).send("Already Assigned");
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

module.exports = {
  generateQRId,
  attendance,
};
