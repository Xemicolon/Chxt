var express = require("express");
var router = express.Router();
const { authenticate, limit } = require("../middleware/index");
const { accountSettings } = require("../controllers/dashboard");

/* GET home page. */
router.get("/dashboard", limit, authenticate, (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.session.user,
    status: "Online",
  });
});

module.exports = router;
