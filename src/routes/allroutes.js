const express  = require("express");

const app = express();

const signup = require("./signup");
const login = require("./login");
const temp = require("./temp");

app.use("/", signup);
app.use("/", login);
app.use("/", temp);

module.exports = app;