const Category = require("../models/Category");
const Product = require("../models/Product");

const clientSearch = {
    category: (name) => Category.find({ name: { $regex: name, $options: "i" } }),
    categoryId: (id) => Category.findOneById(id),
    subcategory: (name) => Category.find({ subCategory: { $regex: name, $options: "i" } }),
    product: (name) => Product.find({ name: { $regex: name, $options: "i" } }),
    productId: (id) => Product.findOneById(id),
};

module.exports = clientSearch;
