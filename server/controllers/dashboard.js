const User = require("../models/User");
const ash = require("express-async-handler");
const { compareOldPassword, UpdateUser } = require("../utils/");

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
  let user = new UpdateUser(username, email, phone_no, newPassword, cPassword);

  if (email || phone_no || newPassword) {
    if (newPassword && newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password is too short!",
      });
    }

    if (newPassword && cPassword !== newPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match!",
      });
    }

    if (!oldPassword) {
      res.status(400).json({
        success: false,
        message: "Enter password to save changes!",
      });
      return;
    }

    if (oldPassword) {
      let confirmPassword = compareOldPassword(oldPassword, userInfo);
      if (!confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Your password is incorrect!",
        });
      }

      const userEmail = await user.updateEmail();
      const userPhone = await user.updatePhone();
      const userPassword = await user.updatePassword();

      res.status(200).json({
        success: true,
        message: "Your changes have been successfully saved!",
        user_info: {
          username: userInfo.username,
          email:
            userEmail.email ||
            userInfo.email ||
            "Please update your phone number",
          phone:
            userPhone.phone_no ||
            userInfo.phone_no ||
            "Please update your phone number",
          password: userPassword.password || userInfo.password,
        },
      });
    }
    return;
  }
  res.status(200).json({
    success: true,
    user_info: {
      username: userInfo.username,
      email: userInfo.email || "Please update your phone number",
      phone: userInfo.phone_no || "Please update your phone number",
      password: userInfo.password,
    },
  });
});
