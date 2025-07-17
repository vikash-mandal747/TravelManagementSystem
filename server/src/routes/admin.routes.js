const express = require("express");
const {revenueByMonth, totalRevenue} = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleBasedAccesControl = require("../middlewares/roleBasedAcces.middleware");

const AdminRouter = express.Router();

AdminRouter.get("/monthly-revenue", authMiddleware, roleBasedAccesControl(["admin"]), revenueByMonth)
AdminRouter.get("/get-revenue", authMiddleware, roleBasedAccesControl(["admin"]), totalRevenue);


module.exports = AdminRouter 