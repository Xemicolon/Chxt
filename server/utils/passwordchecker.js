const { comparePassword } = require("./bcrypt");

exports.confirmPasswordMatch = (res, password, cPassword) => {
  if (cPassword !== password) {
    res.status(400).json({
      success: false,
      message: "Password does not match!",
    });
    return;
  }
};

exports.compareOldPassword = (password, userInfo) => {
  const user = userInfo;
  // decrypt password and compare with old password
  return comparePassword(password, user.password);
};
