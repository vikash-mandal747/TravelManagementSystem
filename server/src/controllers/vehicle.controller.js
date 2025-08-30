const userModel = require("../models/user.model");
const VehicleModel = require("../models/vehicle.model");

//add-vehicle
const addVehicle = async (req, res) => {
    //   - Model, type (SUV/Sedan), registration no, seat count, AC/Non-AC, fare per km, isAvailable
    // from req.body
    // req.userId was attached in authMiddleware
    try {
        let vehicle = await VehicleModel.create({ ...req.body, vehicleOwner: req.userId });
        res.status(201).json({ message: "Vehicle created", data: vehicle })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", Error: error.message })
    }
}

//update vehicle
const updateVehicle = async (req, res) => {

    try {
        const { vehicleId } = req.params;
        await VehicleModel.findByIdAndUpdate(vehicleId, req.body);
        res.status(201).json({ message: "Vehicle Details Updated" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}


//Delete Vehicle
const deleteVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;

        // Step 1: Find the vehicle to get assigned driver
        const vehicle = await VehicleModel.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        const assignedDriverId = vehicle.driver; // Might be null if not assigned

        // Step 2: Delete the vehicle
        await VehicleModel.findByIdAndDelete(vehicleId);

        // Step 3: If a driver was assigned, mark them as available
        if (assignedDriverId) {
            await userModel.findByIdAndUpdate(assignedDriverId, {
                isAvailable: true,
            });
        }

        res.json({ message: "Vehicle deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};




//get vehicle
const getMyVehicle = async (req, res) => {
    try {
        let vehicleList = await VehicleModel.find({ vehicleOwner: req.userId }).populate("driver", "name driverDetails.license_number"); // Only include name and email of driver
        res.status(200).json({ message: "Vehicle List", data: vehicleList })
    } catch (error) {
        console.error("getMyVehicle error:", error); // Add this
        res.status(500).json({ message: "Something went wrong" })
    }
}

// controllers/vehicle.controller.js
const getAvailableVehicles = async (req, res) => {
    try {
        const list = await VehicleModel.find({ isAvailable: true }).select("_id model seat_count");
        res.status(200).json({ data: list });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};



const assignDriver = async (req, res) => {
    try {
        //vehicleId and driverId from req.params
        //check weather driverId is of driver and assign him to vehicle of vehicleId
        //http:localhost:8000/vehicle/12345678/assign-driver/987645678
        const { vehicleId, driverId } = req.params;
        let user = await userModel.findById(driverId);
        let vehicle = await VehicleModel.findById(vehicleId);
        if (user.role === "driver" && user.driverDetails.isAvailable && vehicle) {
            //assign him to the vehicle
            vehicle.driver = driverId;
            await vehicle.save();
            //mark false in the driver profile as well
            user.driverDetails.isAvailable = false;
            // user.driverDetails.assignedVehicle = vehicleId;//not required(reltionship is maintained inside vehicle model) refer line 71
            await user.save();
            res.status(200).json({ message: "Driver Assigned" });
        } else {
            res.status(404).json({ message: "Either Driver or Vehicle Not Availabe" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong..." });
    }

}


module.exports = { addVehicle, updateVehicle, getMyVehicle, getAvailableVehicles, deleteVehicle, assignDriver };