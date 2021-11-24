const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Metrics = require("../models/Metric");

class SuperAdminService {
    static async enableClient({ email, password, username }) {
        try {
            const user = new User({
                email: email,
                password: password,
                username: username,
            });

            const resp = await user.save();

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

    static async getMetrics() {
        try {
            const user = new User({
                email: email,
                password: password,
                username: username,
            });

            const resp = await user.save();

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = SuperAdminService;
