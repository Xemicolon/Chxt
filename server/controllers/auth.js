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

  if (password.length < 6) {
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
  try {
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
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
      message: "Please contact site administrator.",
    });
  }
});

exports.login = ash(async (req, res, next) => {
  const { username, password } = req.body;

  // check for user input
  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: "All the fields are required!",
    });
    return;
  }

  try {
    const user = await User.findOne({ username });

    // check for existence of a user
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Account doesn't exist",
      });
    } else {
      // compare password if username is correct
      const checkPassword = comparePassword(password, user.password);

      if (!checkPassword) {
        res.status(400).json({
          success: false,
          message: "Your login info is incorrect!",
        });
        return;
      }

      req.session.user = {
        id: req.sessionID,
        username: username,
      };

      req.session.isLoggedIn = true;

      res.status(200).json({
        success: true,
        message: "You're logged in!",
        user: req.session.user,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
      message: "Please contact administrator.",
    });
  }
});
