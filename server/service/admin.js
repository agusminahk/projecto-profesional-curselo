const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Metrics = require('../models/Metric');
const Category = require('../models/Category');
const Product = require('../models/Product');
const adminSearch = require('../utils/adminSearch');
const multer = require('multer');

class AdminService {
    static async search(type, id) {
        try {
            const resp = await adminSearch[type](id);

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async createRestaurant(body) {
        try {
            const restaurant = new Restaurant(body); // despues acomodar bien abrir objeto y poner bien donde van las cosas

            const resp = await restaurant.save();

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async createProduct(body) {
        try {
            const product = new Product(body);

            const resp = await product.save();
            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async createCategory(body) {
        try {
            const category = new Category(body);

            const resp = await category.save();

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async createStaff(body) {
        try {
            // ver si hacemos un redirect
            const staff = new User(body);

            const resp = await staff.save();

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    // preguntar q vamos a updatear de cada schema y despues hacerlo
    static async updateRestaurant(id, body) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(id, body, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateProduct(id, body) {
        try {
            const resp = await Product.findByIdAndUpdate(id, body, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateCategory(id, body) {
        try {
            const resp = await Category.findByIdAndUpdate(id, body, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateUser(id, body) {
        try {
            const resp = await User.findByIdAndUpdate(id, body, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteProduct(id) {
        try {
            const product = await Product.deleteMany(id, { $set: { state: true } }, { new: true });
            const restaurant = await Restaurant.findByIdAndUpdate(
                id, // este id remplazar por el id del usuario logeado averiguar como hacer con firebase
                {
                    $pull: {
                        productsId: id,
                    },
                },
                { new: true }
            ); // sacar la referencia del producto dentro del array
            console.log(restaurant, product);
            return { error: false, data: product };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteCategory(id) {
        try {
            const category = await Category.deleteMany(id, { $set: { state: true } }, { new: true });
            const product = await Product.findByIdAndUpdate(id, {}); // sacarle las categorias a todos los productos

            return { error: false, data: category };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteStaff(id) {
        try {
            const user = await User.findByIdAndDelete(id);

            return { error: false, data: user };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = AdminService;
