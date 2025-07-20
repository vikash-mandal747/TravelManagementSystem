const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");
const { addVehicle, updateVehicle, getMyVehicle, deleteVehicle, assignDriver, getAvailableVehicles } = require("../controllers/vehicle.controller");

const VehicleRouter = express.Router();

//add vehicle, protected route and only vehicle owner should add 
VehicleRouter.post("/add-vehicle", authMiddleware, roleBasedAccesControl(["owner"]), addVehicle)

//update vehicle
VehicleRouter.patch("/update-vehicle/:vehicleId", authMiddleware, roleBasedAccesControl(["owner"]), updateVehicle)

//delete vehicle
VehicleRouter.delete("/delete-vehicle/:vehicleId", authMiddleware, roleBasedAccesControl(["owner"]), deleteVehicle)


//get all vehicle
VehicleRouter.get("/my-vehicles", authMiddleware, roleBasedAccesControl(["owner", "admin"]), getMyVehicle)


VehicleRouter.get("/available", getAvailableVehicles);

//assign driver by owner
VehicleRouter.patch("/:vehicleId/assign-driver/:driverId", authMiddleware, roleBasedAccesControl(["owner"]), assignDriver)


module.exports = VehicleRouter