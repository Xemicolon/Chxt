const User = require("../models/User");
const ash = require("express-async-handler");

exports.userDashboard = ash(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.session.user,
    status: "Online",
  });
});
