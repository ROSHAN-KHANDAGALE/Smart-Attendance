const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: [true, "Please Provide Subject Name"],
      maxlength: 150,
      minlength: 3,
      unique: true,
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

module.exports = mongoose.model("Subject", SubjectSchema);
