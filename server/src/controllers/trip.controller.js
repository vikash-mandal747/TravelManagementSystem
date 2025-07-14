const TripModel = require("../models/trip.model");
const VehicleModel = require("../models/vehicle.model");

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
        await VehicleModel.findByIdAndUpdate(trip.vehicle._id,{isAvailable:true});
        res.status(201).json({ message: "Trip Ended please pay the Bill" });
    } catch (error) {
        res.status(500).json({ message: "something went wrong", Error: error.  message });
    }                                                                                                                                              
}


module.exports = { createTrip, startTrip, endTrip };