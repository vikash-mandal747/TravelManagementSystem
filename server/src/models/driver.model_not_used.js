// const mongoose = require("mongoose");


// const driverSchema = new mongoose.Schema({
//     // - Driver schema includes:
//     //   - Name, license number, mobile, currentStatus, assignedVehicle
//     license_number: { type: String, required: true },
//     mobile: { type: String, required: true, unique: true },
//     isAvailable: { type: Boolean },
//     assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
//     userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
//     // one to one, as 1 driver to be assigned to one vehicle 
// })

// const DriverModel = mongoose.model("Driver", driverSchema)
// module.exports = DriverModel