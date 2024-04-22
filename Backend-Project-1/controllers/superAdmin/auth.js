// const superAdminSchema = require("../../models/superAdminModel/superAdminAuth");
// const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, UnauthenticatedError } = require("../../errors");
// const mongoose = require("mongoose");
// const College = require("../../models/College");

// const superAdminRegister = async (req, res) => {
//   const user = await superAdminSchema.create({ ...req.body });
//   res.status(StatusCodes.CREATED).json({ user });
// };

// const superAdminLogin = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     throw new BadRequestError("Please provide email and password");
//   }
//   const user = await superAdminSchema.findOne({ username });
//   if (!user) {
//     throw new UnauthenticatedError("Invalid Credentials");
//   }
//   const isPasswordCorrect = await user.comparePassword(password);
//   if (!isPasswordCorrect) {
//     throw new UnauthenticatedError("Invalid Credentials");
//   }
//   const token = user.createJWT();
//   res.status(StatusCodes.OK).json({ token });
// };

// const superAdminCreate = async (req, res) => {
//   mongoose.connection.close();
//   const db = await mongoose.connect(
//     `mongodb://localhost:27017/` + req.body.collegeCode
//   );
//   req.body.createdBy = req.user.userId;
//   const user = await College.create({ ...req.body });
//   res.status(StatusCodes.CREATED).json({ user });
// };

// module.exports = {
//   superAdminRegister,
//   superAdminLogin,
//   superAdminCreate,
// };
