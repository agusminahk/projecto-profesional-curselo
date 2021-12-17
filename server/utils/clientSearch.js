const Category = require("../models/Category");
const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");

const clientSearch = {
    category: (name, restId) =>
        Category.find({ $and: [{ restaurantId: restId }, { name: { $regex: name, $options: "i" } }] }).populate("productId"),
    categoryId: (id) => Category.findById(id).populate("productId"),
    subcategory: (name, restId) =>
        Product.find({ $and: [{ restaurantId: restId }, { subcategory: { $regex: name, $options: "i" } }] }),
    product: (name, restId) => Product.find({ $and: [{ restaurantId: restId }, { name: { $regex: name, $options: "i" } }] }),
    sale: (boolean, restId) => Product.find({ $and: [{ restaurantId: restId }, { onSale: { state: boolean } }] }),
    productId: (id) => Product.findById(id),
    allProducts: (name, id) => Product.find({ restaurantId: id }).populate("category"),
    allCategory: (name, id) => Category.find({ restaurantId: id }),
    restaurant: (name, id) =>
        Restaurant.findById(id).populate("categoriesId").select({ orders: 0, history: 0, state: 0, metrics: 0, __v: 0 }),
};

module.exports = clientSearch;
