const VehicleModel = require("../models/vehicle.model");

const addVehicle = async (req, res) => {
    //   - Model, type (SUV/Sedan), registration no, seat count, AC/Non-AC, fare per km, isAvailable
    // from req.body
    // req.userId was attached in authMiddleware
    try {
        let vehicle = await VehicleModel.create({ ...req.body, vehicleOwner: req.userId });
        res.status(201).json({ message: "Vehicle created", data: vehicle })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}

module.exports = addVehicle;