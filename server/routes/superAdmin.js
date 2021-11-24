const superAdminRoutes = require("express").Router();
const SuperAdminController = require('../controller/superAdmin')


superAdminRoutes.post('/create', SuperAdminController.createClient)
superAdminRoutes.post('/enable/:id', SuperAdminController.enableClient)
superAdminRoutes.delete('/disable/:id', SuperAdminController.disableClient)
superAdminRoutes.get('/metrics', SuperAdminController.getMetrics)

module.exports = superAdminRoutes;
