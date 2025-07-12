const mongoose = require('mongoose');

//   - Model, type (SUV/Sedan), registration no, seat count, AC/Non-AC, fare per km, isAvailable

const vehicleSchema = new mongoose.Schema({
    model: { type: String, required: true },
    type: { type: String, required: true, enum: ["Car", "Jeep", "Bus", "MiniBus"] },
    registration_number: { type: String, required: true },
    seat_count: { type: Number, required: true, min: 4, max: 56 },
    ventilation: { type: String, enum: ["AC", "Non-AC"] },
    farePerKm: { type: Number, required: true, min: 10 },
    isAvailable: { type: Boolean, default: true },
    vehicleOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //one to many relationship is maintained
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

})

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = VehicleModel;