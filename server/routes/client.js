const clientRoutes = require('express').Router()
const ClientController = require('../controller/client')

// dudosas busquedas preguntar si modificamos el schema de category o solo pueda clickear las categorias y listo estaria solucionado
clientRoutes.get('/search/:id', ClientController.search)
clientRoutes.post('/order/:id', ClientController.postOrder)


module.exports = clientRoutes