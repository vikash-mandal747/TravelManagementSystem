const path = require("path");
const fs = require("fs");

// Create a write stream in append mode
const accessLogStream = fs.createWriteStream(path.join("./access.log"), { flags: "a" });

module.exports = accessLogStream;