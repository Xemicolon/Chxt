require("dotenv").config();
// const createError = require("http-errors");
var http = require("http");
const express = require("express");
const session = require("express-session");
const { sess } = require("./middleware/session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const logger = require("morgan");
const db = require("./db/db");
// const cors = require("cors");

const authRouter = require("./routes/auth");
const DashboardRouter = require("./routes/index");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}
app.use(session(sess));
app.use(helmet());

app.use(logger("dev"));
app.use(express.json({ limit: "10kb" }));

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

// Data Sanitization against XSS attacks
app.use(xss());

db();

app.use("/auth/", authRouter);
app.use("/dashboard/", DashboardRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Up and running...");
});
