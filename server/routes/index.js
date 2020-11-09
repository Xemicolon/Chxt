var express = require("express");
var router = express.Router();
const { authenticate, limit } = require("../middleware/index");
const { userDashboard } = require("../controllers/dashboard");

/* GET home page. */
router.get("/dashboard", limit, authenticate, userDashboard);

module.exports = router;
