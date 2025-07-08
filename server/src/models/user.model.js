const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "owner", "driver", "customer"] },
    gender: { type: String, enum: ["male", "female"] }
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel
