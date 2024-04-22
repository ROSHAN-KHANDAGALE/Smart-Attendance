const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const DepartmentSchema = require("../../models/Department");

const getAllDepartments = async (req, res) => {
  if (req.user.position !== "Principle") {
    throw new BadRequestError(
      "This Route is Only Accesible by Principle Login"
    );
  }
  const data = await DepartmentSchema.aggregate([
    {
      $lookup: {
        from: "faculties",
        localField: "hodID",
        foreignField: "_id",
        as: "hod",
      },
    },
    {
      $project: {
        departmentName: 1,
        "hod.name": 1,
        "hod.number": 1,
        "hod.email": 1,
      },
    },
  ]);
  // const data = await DepartmentSchema.find();
  // if (data == 0) {
  //   throw new NotFoundError(
  //     "Curently There is No Department, Start Creating By Pressing Create Department"
  //   );
  // }
  res.status(StatusCodes.OK).json({ data });
};

module.exports = {
  getAllDepartments,
};
