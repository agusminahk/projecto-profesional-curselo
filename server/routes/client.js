const clientRoutes = require('express').Router()
const ClientController = require('../controller/client')

clientRoutes.get('/search', ClientController.search)
clientRoutes.post('/order/:id', ClientController.postOrder)


module.exports = clientRoutes