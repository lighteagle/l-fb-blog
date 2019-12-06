var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodeyParser = require("body-parser");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var userPostsRouter = require("./routes/userPost");
var postCommentsRouter = require("./routes/postComment");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodeyParser.json());
app.use(bodeyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users-posts", userPostsRouter);
app.use("/users-posts-comments", postCommentsRouter);
module.exports = app;
