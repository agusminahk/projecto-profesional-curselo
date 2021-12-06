const staffRoutes = require("express").Router();
const StaffController = require("../controller/staff");

staffRoutes.get("/kitchen/:id", StaffController.getOrders);
staffRoutes.put("/kitchen/preparing/:id", StaffController.preparingOrder);
staffRoutes.put("/kitchen/done/:id", StaffController.completeOrder);

module.exports = staffRoutes;