const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    name: { type: String, required: true },
    subcategory: [{ type: String, required: true }],
    productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});


module.exports = model("Category", CategorySchema);
