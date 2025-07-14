const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    // - Driver schema includes:
    //   - Name, license number, mobile, currentStatus, assignedVehicle
    license_number: { type: String, required: true },
    mobile: { type: String, required: true},
    isAvailable: { type: Boolean, default: true }
    // assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },//relationshp is maintained inside vehicle model 
    // one to one, as 1 driver to be assigned to one vehicle 
    //Owner will assign not driver himself
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "owner", "driver", "customer"] },
    gender: { type: String, enum: ["male", "female"] },
    driverDetails: driverSchema //embededed schema
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel
