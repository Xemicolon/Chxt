const User = require("../models/User");

exports.accountSettings = async (req, res, next) => {
  const user = await User.findOne({ username: req.session.user.username });
  res.status(200).json({
    success: true,
    username: user.username,
    email: user.email || "Please update your email address",
    phone: user.phone || "Please update your phoen number",
    password: "******",
  });
};
