const adminRoutes = require("express").Router();
const AdminController = require("../controller/admin");
const setImage = require("../middlewares/multer");

// agregar una ruta para poder pedir de nuevo el servicio q fue dado de baja
adminRoutes.get("/search", AdminController.search);

adminRoutes.post("/confirm/purchase", AdminController.confirmPurchase);
adminRoutes.post("/confirm/order", AdminController.confirmOrder);
adminRoutes.delete("/reject/order", AdminController.rejectedOrder);
adminRoutes.post("/confirm/dailyClosing", AdminController.dailyClosing);

adminRoutes.post("/restaurant", AdminController.createRestaurant);
adminRoutes.post("/product",  AdminController.createProduct);
adminRoutes.post("/category", AdminController.createCategory);
adminRoutes.post("/subcategory", AdminController.createSubCategory);

adminRoutes.put("/restaurant/:id", AdminController.updateRestaurant);
adminRoutes.put("/product/:id", AdminController.updateProduct);
adminRoutes.put("/category/:id", AdminController.updateCategory);
adminRoutes.put("/subcategory/:id/:name", AdminController.updateSubCategory);
adminRoutes.put("/images/:id", setImage, AdminController.uploadImage);
adminRoutes.put("/staff/:id", AdminController.updateUser);

adminRoutes.delete("/product/:id", AdminController.deleteProduct); // id del producto
adminRoutes.delete("/category/:id", AdminController.deleteCategory); // id de la categoria
adminRoutes.delete("/subcategory/:id/:name", AdminController.deleteSubCategory); // id de la categoria
adminRoutes.delete("/staff/:id", AdminController.deleteStaff); // id del empleado

module.exports = adminRoutes;
