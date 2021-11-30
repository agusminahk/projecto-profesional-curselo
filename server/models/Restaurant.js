const { Schema, model } = require('mongoose');
const User = require('./User');
const Metrics = require('./Metric');
const Category = require('./Category');
const Product = require('./Product');

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    productsId: [{ type: Schema.Types.ObjectId, required: true, ref: 'Product' }],
    categoriesId: [{ type: Schema.Types.ObjectId, required: true, ref: 'Category' }],
    state: { type: Boolean, default: true },
    orders: [
        {
            table: { type: Number, required: true },
            products: [
                {
                    name: { type: String, required: true },
                    units: { type: Number, required: true },
                },
            ],
            total: { type: Number, required: true },
            state: { type: Boolean, default: false },
            date: { type: Date, default: Date.now },
        },
    ],
    history: [
        {
            total: { type: Number, required: true },
            products: [
                {
                    _id: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
                    units: { type: Number, required: true },
                },
            ],
            paymentMethod: { type: String, required: true },
            date: { type: Date, default: Date.now },
        },
    ],
    metrics: [{ type: Schema.Types.ObjectId, ref: 'Metric' }],
    URL: { type: String, required: true },
    contact: {
        email: { type: String },
        webpage: { type: String },
        telephone: { type: Number },
        instagram: { type: String },
    },
    location: {
        country: { type: String, required: true },
        province: { type: String, required: true },
        city: { type: String, required: true },
        direction: { type: String, required: true },
    },
    logo: { data: Buffer, contentType: String },
    banner: { data: Buffer, contentType: String },
});

RestaurantSchema.pre('remove', async (next) => {
    await User.deleteMany({ restaurantId: this._id });
    await Category.deleteMany({ restaurantId: this._id });
    await Product.deleteMany({ restaurantId: this._id });
    await Metrics.deleteMany({ restaurantId: this._id });
    next();
});

module.exports = model('Restaurant', RestaurantSchema);
