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
        res.status(500).json({ message: "something went wrong", Error: error.message });
    }
}





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


module.exports = { createTrip, startTrip, endTrip };