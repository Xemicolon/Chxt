const User = require("../models/User");
const ash = require("express-async-handler");
const { comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");

exports.register = ash(async (req, res, next) => {
  const { username, password, cPassword } = req.body;
  if (!username || !password || !cPassword) {
    res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
    return;
  }

  if (password.length < 5) {
    res.status(400).json({
      success: false,
      message: "Password must be more than 5 characters long.",
    });
    return;
  }

  if (cPassword !== password) {
    res.status(400).json({
      success: false,
      message: "Password doesn't match.",
    });
    return;
  }

  // Check if user exists before creating an account
  const user = await User.findOne({ username: username });

  if (user) {
    res.status(400).json({
      success: false,
      message: "Hmm.. Account exists.",
    });
    return;
  }

  const newUser = await User.create({
    username,
    password,
  });
  res.status(200).json({
    success: true,
    message: "Account created!",
    user: newUser,
  });
});
