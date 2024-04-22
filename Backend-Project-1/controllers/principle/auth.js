const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const College = require("../../models/College");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const principleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide Email and Password");
  }
  if (email === "kdk@gmail.com" && password === "kdk@gmail.com") {
    const token = jwt.sign(
      {
        userId: "633c789ed6318aa1303dc70f",
        name: email,
        position: "Principle",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    const user = { email: email, position: "Principle" };
    res.status(StatusCodes.OK).json({ token, user });
  }
  // const user = await College.findOne({ email });
  // if (!user) {
  //   throw new UnauthenticatedError("Invalid Email");
  // }
  // const isPasswordCorrect = await user.comparePassword(password);
  // if (!isPasswordCorrect) {
  //   throw new UnauthenticatedError("Invalid Password");
  // }
  // const token = user.createJWT();
};

const principleChangePass = async (req, res) => {
  const { newPass, _id } = req.body;
  if (!_id || !newPass) {
    throw new BadRequestError("Please provide _id and Password");
  }
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(newPass, salt);
  const user = await College.findByIdAndUpdate(_id, { password: pass });
  res.status(StatusCodes.ACCEPTED).json({ user });
};

module.exports = {
  principleLogin,
  principleChangePass,
};
