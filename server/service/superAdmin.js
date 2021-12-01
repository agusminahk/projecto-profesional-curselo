const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Metrics = require('../models/Metric');

class SuperAdminService {
    static async enableClient(id) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(id, { $set: { state: true } }, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async disableClient(id) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(id, { $set: { state: false } }, { new: true });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async deleteClient(id) {
        try {
            const restaurant = await Restaurant.deleteMany({ _id: id });

            console.log(restaurant);

            return { error: false, data: restaurant };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async getClients(query) {
        try {
            const { state } = query;
            const resp =
                (state === 'false' && (await Restaurant.find({ state: false }))) || (await Restaurant.find({}));
            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async getMetrics() {
        try {
            const resp = await Metrics.find({});

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = SuperAdminService;
