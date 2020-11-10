const { comparePassword } = require("./bcrypt");

exports.confirmPasswordLength = (res, password) => {
  if (password.length < 6) {
    res.status(400).json({
      succesS: false,
      message: "Password must be 6 characters or longer",
    });
    return;
  }
};

exports.confirmPassword = (res, password, cPassword) => {
  if (cPassword !== password) {
    res.status(400).json({
      success: false,
      message: "Password doesn't match.",
    });
    return;
  }
};

exports.compareOldPassword = (res, password, userInfo) => {
  const user = userInfo;
  // decrypt password and compare with old password
  return comparePassword(password, user.password);
};
