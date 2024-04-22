const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, "Please provide Department Name"],
      maxlength: 50,
      minlength: 3,
    },
    hodID: {
      type: mongoose.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Please Provide HOD"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "College",
      required: [true, "Please Provide User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
