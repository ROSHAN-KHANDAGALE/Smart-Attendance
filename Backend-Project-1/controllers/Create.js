const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const FacultySchema = require("../models/Faculty");
const SubjectSchema = require("../models/Subject");
const ClassSchema = require("../models/Class");
const StudentSchema = require("../models/Student");
const DepartmentSchema = require("../models/Department");

const createSubjects = async (req, res) => {
  const { teacherName, subjectName } = req.body;
  if (!teacherName) {
    throw new BadRequestError("Please Provide Teacher Name");
  }
  const teacher = await FacultySchema.findOne({ name: teacherName });
  if (req.user.position === "Teacher") {
    const teacherID = req.user.userId;
    let clas = await ClassSchema.findOne({ teacherID }).select("_id");
    if (!teacher) {
      throw new BadRequestError(
        `Teacher Not Found! First Create ${teacherName} Teacher Through HOD Account`
      );
    }
    const subject = await SubjectSchema.create({
      subjectName,
      teacherID: teacher._id,
      classID: clas._id,
      departmentID: teacher.departmentID,
    });
    if (!subject) {
      throw new BadRequestError("Subject is not created");
    }
    res.status(StatusCodes.CREATED).json({ subject });
  } else {
    const subject = await SubjectSchema.create({
      subjectName,
      teacherID: teacher._id,
      classID: req.params.id,
      departmentID: teacher.departmentID,
    });
    if (!subject) {
      throw new BadRequestError("Subject is not created");
    }
    res.status(StatusCodes.CREATED).json({ subject });
  }
};

const createStudents = async (req, res) => {
  if (!req.body.password) {
    req.body.password = req.body.email;
  }
  if (req.user.position == "Teacher") {
    const teacherID = req.user.userId;
    let clas = await ClassSchema.findOne({ teacherID });
    if (!clas) {
      throw new BadRequestError(
        `Teacher Not Found! First Create ${teacherID} Teacher Through HOD Account`
      );
    }
    const student = await StudentSchema.create({
      ...req.body,
      departmentID: clas.departmentID,
      classID: clas._id,
    });

    if (!student) {
      throw new BadRequestError("Student is not created");
    }
    res.status(StatusCodes.CREATED).json(student);
  } else {
    const student = await StudentSchema.create({
      ...req.body,
      departmentID: req.params.Did,
      classID: req.params.Cid,
    });
    if (!student) {
      throw new BadRequestError("Student is not created");
    }
    res.status(StatusCodes.CREATED).json(student);
  }
};

const createTeacher = async (req, res) => {
  req.body.createdBy = req.user.userId;
  if (!req.body.password) {
    req.body.password = req.body.email;
  }
  req.body.position = "Teacher";
  req.body.departmentID = req.params.id;
  // if (condition) {
  const user = await FacultySchema.create({ ...req.body });
  if (!user) {
    throw new BadRequestError("Teacher is not created");
  }
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Teacher Created Successsfully" });
  // } else {
  //   throw new UnauthenticatedError("Unauthenticate User");
  // }
};

const createClass = async (req, res) => {
  let { teacherName, sem } = req.body;
  const { id } = req.params;
  let teacher = await FacultySchema.findOneAndUpdate(
    { name: teacherName },
    { isIncharged: true },
    { new: true }
  );
  const clas = await ClassSchema.create({
    sem,
    teacherID: teacher._id,
    departmentID: id,
  });
  if (!clas) {
    throw new BadRequestError("Class is Not Created");
  }
  res.status(StatusCodes.CREATED).json({ msg: "Class Created Successfully" });
};

const createDepartment = async (req, res) => {
  let {
    name,
    email,
    number,
    password = email,
    hodID,
    createdBy,
    departmentName,
    position,
  } = req.body;
  createdBy = req.user.userId;
  position = "HOD";
  const user = await FacultySchema.create({
    name,
    email,
    number,
    position,
    password,
    createdBy,
  });
  if (user._id) {
    hodID = user._id;
  } else {
    throw new BadRequestError("Something Went Wrong");
  }
  const department = await DepartmentSchema.create({
    departmentName,
    hodID,
    createdBy,
  });

  const user2 = await FacultySchema.findByIdAndUpdate(
    hodID,
    {
      departmentID: department._id,
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.CREATED).json({ user2, department });
};

module.exports = {
  createSubjects,
  createStudents,
  createTeacher,
  createClass,
  createDepartment,
};
