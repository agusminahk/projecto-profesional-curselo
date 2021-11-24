const userRoutes = require("express").Router();
const superAdminRoutes = require("./superAdmin");
const adminRoutes = require("./admin");
const staffRoutes = require("./staff");

// Super Admin
userRoutes.use("/superAdmin", superAdminRoutes);

// Admin
userRoutes.use("/admin", adminRoutes);

// Staff
userRoutes.use("/staff", staffRoutes);

module.exports = userRoutes;
