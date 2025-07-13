const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");
const { createTrip, startTrip, endTrip } = require("../controllers/trip.controller");

const TripRouter = express.Router();

//add trip by customer
TripRouter.post("/create-trip", authMiddleware, roleBasedAccesControl(["customer"]), createTrip);

//start trip by driver
TripRouter.patch("/start-trip/:tripId",
    authMiddleware,
    roleBasedAccesControl(["driver"]),
    startTrip
)

//end trip by driver
TripRouter.patch("/end-trip/:tripId",
    authMiddleware,
    roleBasedAccesControl(["driver"]),
    endTrip
)


module.exports = TripRouter 