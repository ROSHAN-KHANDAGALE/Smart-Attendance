// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const superA = mongoose.createConnection(
//   "mongodb://localhost:27017/SuperAdmin"
// );
// const superAdminSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "Please provide name"],
//       maxlength: 50,
//       minlength: 3,
//     },
//     password: {
//       type: String,
//       required: [true, "Please Provide Password"],
//       minlength: 6,
//     },
//   },
//   { timestamps: true }
// );

// superAdminSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// superAdminSchema.methods.createJWT = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.name },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_LIFETIME,
//     }
//   );
// };

// superAdminSchema.methods.comparePassword = async function (canditatePassword) {
//   const isMatch = await bcrypt.compare(canditatePassword, this.password);
//   return isMatch;
// };

// module.exports = superA.model("User", superAdminSchema);
