const redis = require("redis");

let redisClient = redis.createClient({
  port: 6379,
  host: "localhost",
});

module.exports = redisClient;
