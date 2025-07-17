const TripModel = require("../models/trip.model");
const userModel = require("../models/user.model");
const VehicleModel = require("../models/vehicle.model");
const sendEmail = require("../utils/sendEmail.util");

const createTrip = async (req, res) => {
    try {
        //all necessary data coming from body
        // customer = req.userId
        // method 1: in the route as check noOfPassengers if more than seating_capacity of vehicle, reject with res
        //method 2: apply validation in the schema (recommended)
        let vehicle = await VehicleModel.findById(req.body.vehicle);
        vehicle.isAvailable = false;
        await vehicle.save();
        let trip = await TripModel.create({ ...req.body, customer: req.userId })
        res.status(201).json({ message: "Trip Added", data: trip });
        try {
            const customer = await userModel.findById(req.userId).select("name email");
            await sendEmail(
                customer.email,
                "Booking Confirmed",
                `
          <h2>Hello ${customer.name}, your trip is confirmed!</h2>
          <p><b>From:</b> ${trip.from}</p>
          <p><b>To:</b> ${trip.to}</p>
          <p><b>Start Date:</b> ${trip.startDate.toDateString()}</p>
          <p>We’ll notify you once the driver starts the ride.</p>
        `
            );
            console.log("Confirmation e‑mail sent to", customer.email);
        } catch (mailErr) {
            console.error("Could not send confirmation e‑mail:", mailErr.message);
            // Do NOT throw – the trip is already booked
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong", Error: error.message });
    }
}


//get all trip for customer
const getMyTrips = async (req, res) => {
    try {
        const list = await TripModel.find({ customer: req.userId }).populate(
            "vehicle",
            "model seat_count"
        );
        res.status(200).json({ data: list });
    } catch (error) {
        res.status(500).json({ message: "something went wrong", Error: error.message });
    }
};



// ── delete (cancel) ── by customer
const deleteTrip = async (req, res) => {
    try {
        const { tripId } = req.params;
        const trip = await TripModel.findOne({ _id: tripId, customer: req.userId });
        if (!trip) return res.status(404).json({ Error: "Trip not found" });
        if (trip.isStarted) return res.status(400).json({ Error: "Trip already started" });

        await TripModel.deleteOne({ _id: tripId });
        res.status(200).json({ message: "Trip cancelled" });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};


//get assigned trip for driver 
const getAssignedTrips = async (req, res) => {
  try {
    const driverId = req.userId;

    // 1) vehicles assigned to this driver
    const vehicles = await VehicleModel.find({ driver: driverId }).select("_id");
    const vehicleIds = vehicles.map((v) => v._id);

    // 2) trips for those vehicles
    const trips = await TripModel.find({ vehicle: { $in: vehicleIds } })
      .populate("vehicle", "model registration_number")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: trips });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};


const startTrip = async (req, res) => {

    try {
        //tripId from req.params
        const { tripId } = req.params;
        await TripModel.findByIdAndUpdate(tripId, { isStarted: true })
        res.status(201).json({ message: "Trip Started" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", Error: error.message });
    }
}



const endTrip = async (req, res) => {
    try {
        //tripId from req.params
        const { tripId } = req.params;
        // await TripModel.findByIdAndUpdate(tripId, { isCompleted: true })
        const trip = await TripModel.findById(tripId).populate("vehicle");
        trip.isCompleted = true;
        trip.totalFare = trip.totalDistance * trip.vehicle.farePerKm;
        //Data consistency / cascading
        // make vehicle isAvailable true and also release driver(which is optional)
        console.log(trip);
        trip.vehicle.isAvailable = true;
        await trip.save();
        await VehicleModel.findByIdAndUpdate(trip.vehicle._id, { isAvailable: true });
        res.status(201).json({ message: "Trip Ended please pay the Bill" });
    } catch (error) {
        res.status(500).json({ message: "something went wrong", Error: error.message });
    }
}




module.exports = { createTrip, startTrip, endTrip, getMyTrips, deleteTrip, getAssignedTrips };