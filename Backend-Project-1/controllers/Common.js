const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const ClassSchema = require("../models/Class");
const SubjectSchema = require("../models/Subject");
const FacultySchema = require("../models/Faculty");
const AttendanceSchema = require("../models/Attendance");
const StudentSchema = require("../models/Student");
const bcrypt = require("bcryptjs");

const getAllClass = async (req, res) => {
  if (req.user.position == "Principle" || req.user.position == "HOD") {
    const data = await ClassSchema.find({ departmentID: req.params.id });
    if (data == 0) {
      throw new NotFoundError("There is no Class in this department");
    }
    res.status(StatusCodes.OK).json({ data });
  } else {
    throw new UnauthenticatedError("Unauthenticate User");
  }
};

const getAllSubjectsOfClass = async (req, res) => {
  if (req.user.position == "Principle" || req.user.position == "HOD") {
    const data = await SubjectSchema.find({ classID: req.params.id });
    if (data == 0) {
      throw new NotFoundError("There is no Subject in this Class");
    }
    res.status(StatusCodes.OK).json({ data });
  } else {
    if (req.user.position == "Teacher") {
      const data = await SubjectSchema.find({ teacherID: req.params.id });
      if (data == 0) {
        throw new NotFoundError("Not Assigned Any Subject");
      }
      res.status(StatusCodes.OK).json({ data });
    } else {
      throw new UnauthenticatedError("Unauthenticate User");
    }
  }
};

const getAllStudentOfClass = async (req, res) => {
  if (
    req.user.position == "Principle" ||
    req.user.position == "HOD" ||
    req.user.position == "Teacher"
  ) {
    const totalCount = await AttendanceSchema.aggregate([
      {
        $match: {
          subjectID: mongoose.Types.ObjectId(`${req.params.Sid}`),
        },
      },
      { $group: { _id: "$date", count: { $sum: 1 } } },
      { $count: "total" },
    ]);
    const data = await StudentSchema.aggregate([
      { $match: { classID: mongoose.Types.ObjectId(`${req.params.id}`) } },
      {
        $lookup: {
          from: "attendances",
          pipeline: [
            {
              $match: {
                subjectID: mongoose.Types.ObjectId(`${req.params.Sid}`),
              },
            },
            { $group: { _id: "$studentID", count: { $sum: 1 } } },
          ],
          as: "counts",
        },
      },
      {
        $project: {
          classID: 1,
          departmentID: 1,
          email: 1,
          name: 1,
          number: 1,
          position: 1,
          rollNumber: 1,
          counts: {
            $filter: {
              input: "$counts",
              cond: {
                $eq: ["$$this._id", "$_id"],
              },
            },
          },
        },
      },
    ]);
    res.status(StatusCodes.OK).json({ data, totalCount });
  } else {
    throw new UnauthenticatedError("Unauthenticate User");
  }
};

const getFaculty = async (req, res) => {
  if (req.user.position == "Principle" || req.user.position == "HOD") {
    const data = await FacultySchema.find({
      departmentID: req.params.id,
      isIncharged: false,
    });
    if (data == 0) {
      throw new NotFoundError(
        "Curently There is No Teachers, Start Creating By Pressing Create Teachers"
      );
    }
    res.status(StatusCodes.OK).json({ data });
  } else {
    throw new BadRequestError(
      "This Route is Only Accesible by Principle Login OR HOD Login"
    );
  }
};

const getAllFaculty = async (req, res) => {
  if (
    req.user.position == "Principle" ||
    req.user.position == "HOD" ||
    req.user.position == "Teacher"
  ) {
    const data = await FacultySchema.find({
      departmentID: req.params.id,
    });
    if (data == 0) {
      throw new NotFoundError(
        "Curently There is No Teachers, Start Creating By Pressing Create Teachers"
      );
    }
    res.status(StatusCodes.OK).json({ data });
  } else {
    throw new BadRequestError("This Route is Only Accesible by Teachers");
  }
};

const hodTeacherUpdateProfile = async (req, res) => {
  const {
    body: { email, number, name },
    params: { id },
  } = req;

  if (email === "" || number === "" || name === "") {
    throw new BadRequestError("Fields Cannot Be Empty");
  }
  const job = await FacultySchema.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const hodTeacherChangePass = async (req, res) => {
  const { password, id } = req.body;
  if (!password) {
    throw new BadRequestError("Please Provide Password");
  }
  const salt = await bcrypt.genSalt(10);
  const newPass = await bcrypt.hash(password, salt);
  const user = await FacultySchema.findByIdAndUpdate(
    { _id: id },
    {
      password: newPass,
    },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new BadRequestError("User Not Exist");
  }

  res.status(StatusCodes.ACCEPTED).json({ user });
};

module.exports = {
  getAllClass,
  getAllSubjectsOfClass,
  getAllStudentOfClass,
  getAllFaculty,
  getFaculty,
  hodTeacherUpdateProfile,
  hodTeacherChangePass,
};
