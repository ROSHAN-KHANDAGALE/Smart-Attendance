// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const CollegeSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please provide name"],
//       maxlength: 150,
//       minlength: 2,
//     },
//     email: {
//       type: String,
//       required: [true, "Please Provide Email"],
//       match: [
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         "Please Provide a Valid Email",
//       ],
//       unique: true,
//     },
//     number: {
//       type: String,
//       required: [true, "Please Provide Number"],
//       match: [
//         /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
//         "Please Provide a Valid Number",
//       ],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Please Provide Password"],
//       minlength: 6,
//     },
//     position: {
//       type: String,
//       required: [true, "Please Provide Position"],
//       enum: ["Principle"],
//       default: "Principle",
//     },
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: "College",
//       required: [true, "Please provide user"],
//     },
//   },
//   { timestamps: true }
// );

// CollegeSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// CollegeSchema.methods.createJWT = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.name, position: this.position },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_LIFETIME,
//     }
//   );
// };

// CollegeSchema.methods.comparePassword = async function (canditatePassword) {
//   const isMatch = await bcrypt.compare(canditatePassword, this.password);
//   return isMatch;
// };
// module.exports = mongoose.model("College", CollegeSchema);
