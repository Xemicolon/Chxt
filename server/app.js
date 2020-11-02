require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./config/db");

const authRouter = require("./routes/auth");

var app = express();
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

app.set("trust proxy");
app.use(
  session({
    name: "chxt",
    secret: process.env.SESSION_SECRET_KEY,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 600000, // Time is in miliseconds
    },
    store: new RedisStore({ client: redisClient, ttl: 86400 }),
    saveUninitialized: false,
    resave: false,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

db();

app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
