const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttendanceSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, "Please Provide Date"],
      maxlength: 15,
      minlength: 5,
    },
    subjectID: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
      required: [true, "Please Provide Subject"],
    },
    studentID: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: [true, "Please Provide Student"],
    },
    teacherID: {
      type: mongoose.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Please Provide Teacher"],
    },
    classID: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
      required: [true, "Please Provide Class"],
    },
    departmentID: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: [true, "Please Provide Department"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
