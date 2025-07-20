//only Vehicle owner, driver & customer routes here
const express = require("express");
const { userSignup, userLogin, addDriverDetails, getAvailableDrivers } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");

const UserRouter = express.Router();

UserRouter.post("/signup", userSignup)
UserRouter.post("/login", userLogin)


//update driver Details
UserRouter.patch("/add-driver", authMiddleware, roleBasedAccesControl(["driver"]), addDriverDetails)

//get all available drivers
UserRouter.get("/available-drivers",authMiddleware,roleBasedAccesControl(["owner"]), // Only owners should access this
getAvailableDrivers
);


module.exports = UserRouter