const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", default: "Otros" },
    subcategory: [{ type: String }],
    price: { type: Number, required: true },
    onSale: { state: { type: Boolean, default: false }, description: String },
});

module.exports = model("Product", ProductSchema);
