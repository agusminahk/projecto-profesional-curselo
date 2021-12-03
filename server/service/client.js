const Restaurant = require("../models/Restaurant");
const clientSearch = require("../utils/clientSearch");

class ClientService {
    static async search(id, type, name) {
        try {
            const resp = await clientSearch[type](name, id);

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
