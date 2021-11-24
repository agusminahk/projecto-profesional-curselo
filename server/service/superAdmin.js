const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Metrics = require("../models/Metric");
const Category = require("../models/Category");
const Product = require("../models/Product");

class SuperAdminService {
    static async createClient(body) {
        try {
            const user = new User(body);

            const resp = await user.save();

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async enableClient(id) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(id, { $set: { state: true } }, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async disableClient(id) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(id, { $set: { state: false } }, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteClient(id) {
        try {
            const user = await User.deleteMany({ restaurantId: id });
            const category = await Category.deleteMany({ restaurantId: id });
            const products = await Product.deleteMany({ restaurantId: id });
            const metrics = await Metrics.deleteMany({ restaurantId: id });
            const restaurant = await Restaurant.deleteMany({ _id: id });

            console.log(user, category, products, metrics, restaurant);

            return { error: false, data: restaurant };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async getClients() {
        try {
            const resp = await Restaurant.find({});

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async getMetrics() {
        try {
            const resp = await Metrics.find({});

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = SuperAdminService;
