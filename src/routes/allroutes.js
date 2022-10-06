const express  = require("express");

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const signup = require("./signup");
const login = require("./login");
const updateProfile = require("./updateProfile");
const resetPassword = require("./resetPassword");
const usernameCheck = require("./usernameCheck");
const temp = require("./temp");

app.use("/", signup);
app.use("/", login);
app.use("/", updateProfile);
app.use("/", resetPassword);
app.use("/", usernameCheck);
app.use("/", temp);

module.exports = app;