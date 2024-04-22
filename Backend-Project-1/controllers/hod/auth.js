const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const FacultySchema = require("../../models/Faculty");

const hodLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide Email and Password");
  }
  const user = await FacultySchema.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Email");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }
  if (user.position === "HOD") {
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ token, user });
  } else {
    throw new UnauthenticatedError("Unauthenticate User");
  }
};

module.exports = {
  hodLogin,
};
