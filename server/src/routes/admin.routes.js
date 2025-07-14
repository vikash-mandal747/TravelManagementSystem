const express = require("express");
const revenueByMonth = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");

const AdminRouter = express.Router();

AdminRouter.get("/get-revenue", authMiddleware, roleBasedAccesControl(["admin"]), revenueByMonth)


module.exports = AdminRouter 