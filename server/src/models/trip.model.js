const mongoose = require("mongoose");
const VehicleModel = require("./vehicle.model");

const tripSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    totalDistance: { type: Number, required: true },
    noOfPassengers: {
        type: Number, required: true,
        validate: {
            validator: async function (value) {
                //find the vehicle and check the capacity
                let vehicle = await VehicleModel.findById(this.vehicle);
                if (value <= vehicle.seat_count) {
                    return true
                }
                return false
            },
            message: "Seating of the Vehicle Exceeded"
        }
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function (value) {
                // Allow today (truncate time) or any future date
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value >= today;
            },
            message: "Start date cannot be in the past",
        },
    },

    endDate: {
        type: Date,               // <‑‑ change from String → Date
        required: [true, "End date is required"],
        validate: {
            validator: function (value) {
                // If startDate isn’t set yet, let other validators catch it
                if (!this.startDate) return true;
                return value > this.startDate;
            },
            message: "End date must be after start date",
        },
    },
    isStarted: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    totalFare: { type: Number },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //customer will be added by Auth Middleware 
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }
})

const TripModel = mongoose.model("Trip", tripSchema)
module.exports = TripModel