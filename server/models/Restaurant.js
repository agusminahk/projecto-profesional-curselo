const { Schema, model } = require("mongoose");

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    productsId: [{ type: Schema.Types.ObjectId, required: true, ref: "Product" }],
    categoriesId: [{ type: Schema.Types.ObjectId, required: true, ref: "Category" }],
    state: { type: Boolean, default: true },
    history: [
        {
            total: { type: Number, required: true },
            products: [
                { _id: { type: Schema.Types.ObjectId, required: true, ref: "Product" }, units: { type: Number, required: true } },
            ],
            date: { type: Date, default: Date.now },
        },
    ],
    metrics: [{ type: Schema.Types.ObjectId, ref: "Metric" }],
    URL: { type: String, required: true },
    contact: {
        email: String,
        webpage: String,
        telephone: Number,
        instagram: String,
    },
    location: {
        country: { type: String, required: true },
        province: { type: String, required: true },
        city: { type: String, required: true },
        direction: { type: String, required: true },
    },
});

module.exports = model("Restaurant", RestaurantSchema);
