//only Vehicle owner, driver & customer routes here
const express = require("express");
const { userSignup, userLogin, addDriverDetails } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");

const UserRouter = express.Router();

UserRouter.post("/signup", userSignup)
UserRouter.post("/login", userLogin)


//update driver Details

UserRouter.patch("/add-driver", authMiddleware, roleBasedAccesControl(["driver"]), addDriverDetails)


module.exports = UserRouter