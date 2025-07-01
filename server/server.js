const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDB = require("./config/mongodb.config");
const accessLogStream = require("./middlewares/logger.middleware");
const PORT = process.env.PORT || 5000

connectToDB()
const app = express();
app.use(express.json());

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
        res.status(200).json({ message: "this request not defined" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})