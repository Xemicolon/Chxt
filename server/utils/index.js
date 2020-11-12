const { comparePassword, hashPassword } = require("./bcrypt");
const {
  confirmPasswordMatch,
  compareOldPassword,
} = require("./passwordchecker");
const { UpdateUser } = require("./updateUserAccount");

module.exports = {
  comparePassword,
  hashPassword,
  confirmPasswordMatch,
  compareOldPassword,
  UpdateUser,
};
