const bcrypt = require("bcryptjs");

exports.comparePassword = (password, comparePassword) => {
  return bcrypt.compareSync(password, comparePassword);
};
