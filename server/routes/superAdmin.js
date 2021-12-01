const superAdminRoutes = require('express').Router();
const SuperAdminController = require('../controller/superAdmin');

superAdminRoutes.put('/enable/:id', SuperAdminController.enableClient);
superAdminRoutes.put('/disable/:id', SuperAdminController.disableClient);
superAdminRoutes.delete('/delete/:id', SuperAdminController.deleteClient);

superAdminRoutes.get('/clients', SuperAdminController.getClients);
superAdminRoutes.get('/metrics', SuperAdminController.getMetrics);

module.exports = superAdminRoutes;
