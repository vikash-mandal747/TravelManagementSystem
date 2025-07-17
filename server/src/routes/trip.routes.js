const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");
const { createTrip, startTrip, endTrip, getMyTrips, deleteTrip, getAssignedTrips } = require("../controllers/trip.controller");

const TripRouter = express.Router();

//add trip by customer
TripRouter.post("/create-trip", authMiddleware, roleBasedAccesControl(["customer"]), createTrip);


//get all trip for customer
TripRouter.get(
    "/my",
    authMiddleware,
    roleBasedAccesControl(["customer"]),
    getMyTrips
);

//delete trip 
TripRouter.delete(
    "/:tripId",
    authMiddleware,
    roleBasedAccesControl(["customer"]),
    deleteTrip
);


//get assigned trip for driver 
TripRouter.get("/assigned",
    authMiddleware,
    roleBasedAccesControl(["driver"]),
    getAssignedTrips
);


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