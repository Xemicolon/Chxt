const bcrypt = require("bcryptjs");

exports.comparePassword = (password, comparePassword) => {
  return bcrypt.compareSync(password, comparePassword);
};

exports.hashPassword = async (password, userInfo) => {
  const user = await userInfo;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  return user.password;
};
