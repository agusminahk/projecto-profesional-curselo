const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Metrics = require("../models/Metric");
const Category = require("../models/Category");
const Product = require("../models/Product");

const adminSearch = {
    category: (id) => Category.find({ restaurantId: id }),
    product: (id) => Product.find({ restaurantId: id }).populate("category", { name: 1 }),
    metrics: (id) => Metrics.find({ restaurantId: id }),
    user: (id) => User.find({ restaurantId: id }),
    restaurant: (id) => Restaurant.findById(id),
};

module.exports = adminSearch;
