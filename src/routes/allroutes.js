const express  = require("express");

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const signup = require("./signup");
const login = require("./login");
const updateProfile = require("./updateProfile");
const resetPassword = require("./resetPassword");
const usernameCheck = require("./usernameCheck");
const forgotPassword = require("./forgotPassword");
const temp = require("./temp");

app.use("/signup", signup);
app.use("/login", login);
app.use("/updateProfile", updateProfile);
app.use("/resetPassword", resetPassword);
app.use("/usernameCheck", usernameCheck);
app.use("/forgotPassword", forgotPassword);
app.use("/", temp);

module.exports = app;