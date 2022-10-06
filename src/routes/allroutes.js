const express  = require("express");

const app = express();

const signup = require("./signup");
const login = require("./login");
const updateProfile = require("./updateProfile");
const resetPassword = require("./resetPassword");
const temp = require("./temp");

app.use("/", signup);
app.use("/", login);
app.use("/", updateProfile);
app.use("/", resetPassword);
app.use("/", temp);

module.exports = app;