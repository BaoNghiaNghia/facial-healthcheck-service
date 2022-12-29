var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var healthcheckRouter = require("./healthcheck");

var app = express();

app.use("/auth/", authRouter);
app.use("/book/", bookRouter);
app.use("/healthcheck", healthcheckRouter);

module.exports = app;