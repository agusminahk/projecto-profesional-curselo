const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    name: { type: String, required: true },
    subcategory: [{ type: String, required: true }],
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
});
// hacer un seed q por default se cree una categoria q se llame otros donde va a ser el valor por default y tambien se le va a asignar a un producto cuando se borre la categoria

module.exports = model("Category", CategorySchema);
