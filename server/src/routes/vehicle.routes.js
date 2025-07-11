const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");
const addVehicle = require("../controllers/vehicle.controller");

const VehicleRouter = express.Router();

//add vehicle, protected route and only vehicle owner should add 
VehicleRouter.post("/add-vehicle", authMiddleware, roleBasedAccesControl(["owner"]),addVehicle)


module.exports = VehicleRouter