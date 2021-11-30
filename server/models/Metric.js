const { Schema, model } = require("mongoose");

const MestricSchema = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    dailySale: { type: Number, required: true },
    productsId: [
        {
            _id: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
            units: { type: Number, required: true }
        },
    ],
    paymentMethod: [{name: {type: String, required: true}, units: { type: Number, required: true}}],
    date: { type: Date, default: Date.now },
});

module.exports = model("Metric", MestricSchema);