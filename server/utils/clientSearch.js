const Category = require("../models/Category");
const Product = require("../models/Product");

const clientSearch = {
    category: (name, restId) => Category.find({ $and: [{ restaurantId: restId }, { name: { $regex: name, $options: "i" } }] }),
    categoryId: (id) => Category.findOneById(id),
    subcategory: (name, restId) =>
        Category.find({ $and: [{ restaurantId: restId }, { subCategory: { $regex: name, $options: "i" } }] }),
    product: (name, restId) => Product.find({ $and: [{ restaurantId: restId }, { name: { $regex: name, $options: "i" } }] }),
    productId: (id) => Product.findOneById(id),
};

module.exports = clientSearch;
