const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    sem: {
      type: String,
      required: [true, "Please provide semester"],
      maxlength: 10,
      minlength: 3,
    },
    teacherID: {
      type: mongoose.Types.ObjectId,
      ref: "Faculty",
      required: [
        true,
        "Please Provide which teacher is assigned to this class",
      ],
      unique: true,
    },
    departmentID: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: [true, "Please Provide which Department"],
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "College",
    //   required: [true, "Please Provide User"],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
