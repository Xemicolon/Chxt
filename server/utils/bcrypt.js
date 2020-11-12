const bcrypt = require("bcryptjs");

exports.comparePassword = (password, comparePassword) => {
  return bcrypt.compareSync(password, comparePassword);
};

exports.hashPassword = (password, userInfo) => {
  const user = userInfo;
  if (user.isModified) {
    const saltRounds = 10;
    user.password = bcrypt.hashSync(password, saltRounds);
  }
  return user.password;
};
