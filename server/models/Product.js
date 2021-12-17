const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: [{ type: String, required: true }],
    price: { type: Number, required: true },
    img: { data: Buffer, contentType: String },
    onSale: { state: { type: Boolean, default: false }, description: String },
});

module.exports = model("Product", ProductSchema);
