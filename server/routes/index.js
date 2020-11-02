var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.cookie(req.sessionID);
  res.status(200).json(req.session);
});

module.exports = router;
