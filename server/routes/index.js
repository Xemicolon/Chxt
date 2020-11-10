var express = require("express");
var router = express.Router();
const { authenticate, limit } = require("../middleware/index");
const {
  userDashboard,
  userAccountSettings,
  updateAccountInfo,
} = require("../controllers/dashboard");

/* GET home page. */
router.get("/", limit, authenticate, userDashboard);
router.get("/account-settings", authenticate, userAccountSettings);
router.patch("/account-settings", authenticate, updateAccountInfo);

module.exports = router;
