const adminRoutes = require('express').Router();
const AdminController = require('../controller/admin');
const setImage = require('../middlewares/multer');

// agregar una ruta para poder pedir de nuevo el servicio q fue dado de baja
// agregar una ruta para poder hacer el cierre diario y q se limpie el historial
// ver si se agrega una propiedad nueva q sea pedidos y una ves entregado pasen al historial
// agregar una ruta para confirmar el pedido una ves pagado y pasarlo al historial
adminRoutes.get('/search', AdminController.search);

adminRoutes.post('/confirm/purchase', AdminController.confirmPurchase);
adminRoutes.post('/confirm/order', AdminController.confirmOrder);
adminRoutes.post('/confirm/dailyClosing', AdminController.dailyClosing);

adminRoutes.post('/restaurant', AdminController.createRestaurant);
adminRoutes.post('/product', AdminController.createProduct);
adminRoutes.post('/category', AdminController.createCategory);
adminRoutes.post('/staff', AdminController.createStaff);

adminRoutes.put('/restaurant/:id', AdminController.updateRestaurant);
adminRoutes.put('/product/:id', AdminController.updateProduct);
adminRoutes.put('/category/:id', AdminController.updateCategory);
adminRoutes.put('/images/:id', setImage, AdminController.uploadImage);
adminRoutes.put('/staff/:id', AdminController.updateUser); // para modificar el rol q tenga o algun otro dato

adminRoutes.delete('/product/:id', AdminController.deleteProduct);
adminRoutes.delete('/category/:id', AdminController.deleteCategory);
adminRoutes.delete('/staff/:id', AdminController.deleteStaff);

module.exports = adminRoutes;
