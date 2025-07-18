const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to DB');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectToDB;