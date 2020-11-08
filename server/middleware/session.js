const session = require("express-session");
let RedisStore = require("connect-redis")(session);
let redisClient = require("../db/redis");

exports.sess = {
  store: new RedisStore({ client: redisClient, ttl: 86400 }),
  name: "chxt_session",
  secret: process.env.SESSION_SECRET_KEY,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 72 * 60 * 60 * 1000, // Cookie expires after 72 hours
  },
  saveUninitialized: false,
  resave: false,
};
