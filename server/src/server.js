const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDB = require("./config/mongodb.config");
const morgan = require('morgan');
const accessLogStream = require("./middlewares/logger.middleware");
const UserRouter = require("./routes/user.routes");
const VehicleRouter = require("./routes/vehicle.routes");
const TripRouter = require("./routes/trip.routes");
const PORT = process.env.PORT || 5000

connectToDB()
const app = express();
app.use(express.json());

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


//user routes
app.use("/users", UserRouter)

//vehicle routes
app.use("/vehicle", VehicleRouter)

//trip router
app.use("/trips", TripRouter)

//test route
app.get("/test", (req, res) => {
    try {
        res.status(200).json({ message: "this is test route" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})


// Handle undefined route
app.use((req, res) => {
    try {
        res.status(404).json({ message: "this request not defined" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})