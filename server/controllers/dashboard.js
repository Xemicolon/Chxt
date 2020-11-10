const User = require("../models/User");
const ash = require("express-async-handler");
const {
  hashPassword,
  confirmPassword,
  confirmPasswordLength,
  compareOldPassword,
} = require("../utils/");

exports.userDashboard = ash(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.session.user,
    status: "Online",
  });
});

exports.userAccountSettings = ash(async (req, res, next) => {
  const username = req.session.user.username;
  try {
    const user = await User.findOne({ username });
    res.status(200).json({
      success: true,
      user_info: {
        username: user.username,
        email: username.email || "Please update your email",
        phone: username.phone_no || "Please update your phone number",
        password: "******",
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Please contact website administrator",
      error: err,
    });
  }
});

exports.updateAccountInfo = ash(async (req, res, next) => {
  const username = req.session.user.username;
  const { email, phone_no, oldPassword, newPassword, cPassword } = req.body;
  const userInfo = await User.findOne({ username });
  let newHashedPassword;

  try {
    if (newPassword) {
      confirmPasswordLength(res, newPassword);
    }

    if (newPassword && cPassword) {
      confirmPassword(res, newPassword, cPassword);
    }

    if (oldPassword && newPassword && cPassword) {
      if (compareOldPassword(res, oldPassword, userInfo)) {
        newHashedPassword = await hashPassword(newPassword, userInfo);
        console.log(newHashedPassword);
      } else {
        res.status(400).json({
          success: false,
          message: "Password is incorrect!",
        });
      }
    }

    const user = await User.findOneAndUpdate(
      { username },
      {
        email: email,
        phone_no: phone_no,
        password: newHashedPassword || userInfo.password,
      }
    );
    await user.save();
    const newUserInfo = await User.findOne({ username });
    res.status(200).json({
      success: true,
      user_info: {
        username: user.username,
        email: newUserInfo.email || "Please update your email",
        phone: newUserInfo.phone_no || "Please update your phone number",
        password: newUserInfo.password || "*******",
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Please contact website administrator",
      error: err.message,
    });
  }
});
