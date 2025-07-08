//only Vehicle owner, driver & customer routes here
const express = require("express");
const { userSignup, userLogin } = require("../controllers/user.controller");

const UserRouter = express.Router();

UserRouter.post("/signup", userSignup)
UserRouter.post("/login", userLogin)


module.exports = UserRouter