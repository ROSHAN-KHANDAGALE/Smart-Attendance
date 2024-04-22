const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const StudentSchema = require("../../models/Student");
const bcrypt = require("bcryptjs");

const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide Email and Password");
  }
  const user = await StudentSchema.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Email");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token, user });
};

const studentChangePass = async (req, res) => {
  const { newPass, _id } = req.body;
  if (!_id || !newPass) {
    throw new BadRequestError("Please provide _id and Password");
  }
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(newPass, salt);
  const user = await StudentSchema.findByIdAndUpdate(
    _id,
    {
      password: pass,
    },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new BadRequestError("Wrong ID");
  }

  res.status(StatusCodes.ACCEPTED).json({ user });
};

module.exports = {
  studentLogin,
  studentChangePass,
};
