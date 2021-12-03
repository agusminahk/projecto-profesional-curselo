const clientRoutes = require('express').Router()
const ClientController = require('../controller/client')

clientRoutes.get('/search/:id', ClientController.search)
clientRoutes.post('/order/:id', ClientController.postOrder)


module.exports = clientRoutes