const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth");

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
