const Category = require("../models/Category");
const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");

// ver si las primeras dos el cliente puede buscar por categoria o solo puede clickear un select
const clientSearch = {
    category: (name, restId) =>
        Category.find({ $and: [{ restaurantId: restId }, { name: { $regex: name, $options: "i" } }] }).populate("productId"),
    categoryId: (id) => Category.findOneById(id).populate("productId"),
    subcategory: (name, restId) =>
        Product.find({ $and: [{ restaurantId: restId }, { subcategory: { $regex: name, $options: "i" } }] }),
    product: (name, restId) => Product.find({ $and: [{ restaurantId: restId }, { name: { $regex: name, $options: "i" } }] }),
    sale: (boolean, restId) => Product.find({ $and: [{ restaurantId: restId }, { onSale: { state: boolean } }] }),
    productId: (id) => Product.findOneById(id),
    restaurant: (id) =>
        Restaurant.findOneById(id).populate("productsId categoriesId").select({ orders: 0, history: 0, state: 0, metrics: 0 }),
};

module.exports = clientSearch;
