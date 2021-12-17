const { Schema, model } = require("mongoose");

const MetricSASchema = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, required: true, ref: "Restaurant" },
    date: { type: Date, default: Date.now },
});

module.exports = model("MetricSA", MetricSASchema);
