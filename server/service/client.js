const Product = require("../models/Product");
const Category = require("../models/Category");
const Restaurant = require("../models/Restaurant");
const clientSearch = require("../utils/clientSearch");

class ClientService {
    static async search(type, name) {
        try {
            const resp = await clientSearch[type](name);

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async postOrder(body, id) {
        try {
            const resp = await Restaurant.findByIdAndUpdate(
                id,
                {
                    $push: {
                        orders: body,
                    },
                },
                { new: true }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = ClientService;
