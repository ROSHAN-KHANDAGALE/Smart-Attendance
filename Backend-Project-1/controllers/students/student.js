const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
// const { BadRequestError, UnauthenticatedError } = require("../../errors");
const AttendanceSchema = require("../../models/Attendance");

const student = async (req, res) => {
  const data = await AttendanceSchema.aggregate([
    { $match: { studentID: mongoose.Types.ObjectId(`${req.user.userId}`) } },
    { $group: { _id: "$subjectID", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "subjects",
        localField: "_id",
        foreignField: "_id",
        as: "subject",
      },
    },
    {
      $project: {
        count: 1,
        "subject.subjectName": 1,
      },
    },
    {
      $lookup: {
        from: "attendances",
        localField: "_id",
        foreignField: "subjectID",
        as: "totalCount",
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ data });
};
module.exports = { student };
