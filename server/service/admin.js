const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Metrics = require("../models/Metric");
const Category = require("../models/Category");
const Product = require("../models/Product");
const adminSearch = require("../utils/adminSearch");
const closeDay = require("../utils/closeDay");

class AdminService {
    static async search(type, id) {
        try {
            const resp = await adminSearch[type](id);

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async confirmPurchase(id, table, body) {
        try {
            const restaurant = await Restaurant.findById(id);
            const arr = [];

            const order = restaurant.orders.filter((e, i) => {
                if (e.table === table) {
                    e["index"] = i;
                    return e;
                }
            });
            // probar si puedo hacer el map seguido del filter
            restaurant.orders.splice(order[0].index, 1);

            order.map((e) =>
                arr.push({
                    total: e.total,
                    products: e.products,
                    date: e.date,
                    paymentMethod: body.paymentMethod,
                })
            );

            restaurant.history.push(arr[0]);

            const resp = await restaurant.save();

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async confirmOrder(id, table) {
        try {
            const resp = await Restaurant.findOneByIdAndUpdate(
                id,
                {
                    $set: {
                        "orders.$[index].confirmed": true,
                    },
                },
                {
                    arrayFilters: [{ "index.table": table }],
                    new: true,
                }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async dailyClosing(id) {
        try {
            const restaurant = await Restaurant.findById(id);

            const metrics = closeDay(restaurant.history); // me falta hacer lo mismo con las tarjetas y ver si lo hago con el date

            restaurant.history = [];

            await restaurant.save();

            const newMetrics = new Metrics({
                restaurantId: id,
                dailySale: metrics.total,
                productsId: metrics.products,
                paymentMethod: metrics.paymentMethod,
            });

            await newMetrics.save();

            return { error: false, data: restaurant };
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

    static async deleteProduct(id, user) {
        try {
            console.log(user);

            await Product.find(id, { $set: { state: true } }, { new: true });

            const restaurant = await Restaurant.findByIdAndUpdate(
                user.restaurantId,
                {
                    $pull: {
                        productsId: id,
                    },
                },
                { new: true }
            );

            return { error: false, data: restaurant };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteCategory(id, user) {
        try {
            await Category.deleteOne({ _id: id });

            await Product.updateMany(
                { $and: [{ restaurantId: user.restaurantId }, { category: id }] },
                {
                    $set: {
                        category: "Otros",
                        subcategory: [],
                    },
                }
            );

            const restaurant = await Restaurant.findByIdAndUpdate(
                user.restaurantId,
                {
                    $pull: {
                        categoriesId: id,
                    },
                },
                { new: true }
            );

            return { error: false, data: restaurant };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteStaff(id) {
        try {
            const user = await User.deleteOne({ _id: id });

            return { error: false, data: user };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = AdminService;