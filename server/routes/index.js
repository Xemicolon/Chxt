var express = require("express");
var router = express.Router();
const { authenticate, limit } = require("../middleware/index");

/* GET home page. */
router.get("/", limit, authenticate, (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.session.user,
  });
});

module.exports = router;
