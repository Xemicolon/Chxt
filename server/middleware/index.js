const { authenticate } = require("../middleware/authenticate");
const limit = require(".././middleware/rateLimiter");
module.exports = {
  authenticate,
  limit,
};
