const { comparePassword, hashPassword } = require("./bcrypt");
const {
  confirmPassword,
  confirmPasswordLength,
  compareOldPassword,
} = require("./passwordchecker");

module.exports = {
  comparePassword,
  hashPassword,
  confirmPassword,
  confirmPasswordLength,
  compareOldPassword,
};
