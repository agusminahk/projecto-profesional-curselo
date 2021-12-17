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

            const order = restaurant.orders.findIndex((e) => e.table == table);

            if (order !== -1) {
                const orden = restaurant.orders[order];

                restaurant.orders.splice(order, 1);

                restaurant.history.push(orden);

                const resp = await restaurant.save();
                return { error: false, data: resp };
            }
            return { error: true, data: "Not Found" };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async confirmOrder(id, table) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(
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

    static async rejectedOrder(id, table) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        orders: { table: table },
                    },
                },
                {
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

            const metrics = closeDay(restaurant.history); 

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

    static async createRestaurant(body, user) {
        try {
            const restaurant = new Restaurant(body);
            const resp = await restaurant.save();

            const userUpdate = await User.findByIdAndUpdate(user._id, { $set: { restaurantId: resp._id } }, { new: true });

            return { error: false, data: resp, user: userUpdate };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async createProduct(body) {
        try {
            const product = new Product(body);
            const resp = await product.save();

            const restaurant = await Restaurant.findByIdAndUpdate(
                body.restaurantId,
                { $push: { productsId: resp._id } },
                { new: true }
            );

            await Category.findByIdAndUpdate(body.category, { $push: { productId: resp._id } }, { new: true });

            return { error: false, data: restaurant };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async createCategory(body) {
        try {
            const category = new Category(body);
            const resp = await category.save();

            const restaurant = await Restaurant.findByIdAndUpdate(
                body.restaurantId,
                { $push: { categoriesId: resp._id } },
                { new: true }
            ).populate("categoriesId");

            return { error: false, data: restaurant };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async createSubCategory(body) {
        try {
            const resp = await Category.findByIdAndUpdate(body.categoryId, { $push: { subcategory: body.name } }, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateRestaurant(id, body) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        name: body.name,
                        URL: body.url,
                        "contact.email": body.email,
                        "contact.webpage": body.webpage,
                        "contact.telephone": body.telephone,
                        "contact.instagram": body.instagram,
                        "location.country": body.country,
                        "location.province": body.province,
                        "location.city": body.city,
                        "location.direction": body.direction,
                        logo: body.logo,
                        banner: body.banner,
                    },
                },
                { new: true }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateProduct(id, body) {
        try {
            const resp = await Product.findByIdAndUpdate(
                id,
                {
                    $set: {
                        name: body.name,
                        description: body.description,
                        state: body.state,
                        category: body.category,
                        subcategory: body.subcategory,
                        price: body.price,
                        "onSale.state": body.onSale?.state,
                        "onSale.description": body.onSale?.description,
                    },
                },
                { new: true }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateCategory(id, body) {
        try {
            const resp = await Category.findByIdAndUpdate(id, { $set: { name: body.name } }, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateSubCategory(id, name, body) {
        try {
            const resp = await Category.findByIdAndUpdate(
                id,
                {
                    $set: { "subcategory.$[name]": body.name },
                },
                { arrayFilters: [{ name: name }], new: true }
            );

            await Product.updateMany(
                { $and: [{ category: id }, { subcategory: name }] },
                {
                    $set: {
                        "subcategory.$[name]": body.name,
                    },
                },
                { arrayFilters: [{ name: name }], new: true }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async updateUser(id, body) {
        try {
            const resp = await User.findByIdAndUpdate(
                id,
                {
                    $set: {
                        firstname: body.firstname,
                        lastname: body.lastname,
                        email: body.email,
                        role: body.role,
                        telephone: body.telephone,
                    },
                },
                { new: true }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteProduct(id, user) {
        try {
            await Product.deleteOne({ _id: id });

            const restaurant = await Restaurant.findByIdAndUpdate(
                user.restaurantId,
                {
                    $pull: {
                        productsId: id,
                    },
                },
                { new: true }
            );

            await Category.updateMany(
                { productId: id },
                {
                    $pull: {
                        productId: id,
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
            const category = await Category.deleteOne({ _id: id });

            if (category.deletedCount === 0) return { error: true, data: { message: "Not Found", status: 404 } };

            const categoryOtros = await Category.find({ name: "Otros" });

            await Product.updateMany(
                { category: id },
                {
                    $set: {
                        category: categoryOtros[0]._id,
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
            ).populate("categoriesId");

            return { error: false, data: restaurant };
        } catch (error) {
            return { error: true, data: error };
        }
    }

    static async deleteSubCategory(id, name) {
        try {
            const category = await Category.findByIdAndUpdate(id, { $pull: { subcategory: name } }, { new: true });

            await Product.updateMany({ subcategory: name }, { $pull: { subcategory: name } });

            return { error: false, data: category };
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
