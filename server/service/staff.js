const Restaurant = require("../models/Restaurant");

class StaffService {
    static async getOrders(id) {
        try {
            const resp = await Restaurant.find({ $and: [{ _id: id }, { "orders.state": { $ne: "Done" } }] }).select({
                orders: 1,
            });

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async preparingOrder(id, table) {
        try {
            const resp = await Restaurant.findOneByIdAndUpdate(
                id,
                {
                    $set: {
                        "orders.$[index].state": "Preparing",
                    },
                },
                {
                    arrayFilters: [{ "index.table": table }],
                    new: true,
                }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async completeOrder(id, table) {
        try {
            const resp = await Restaurant.findOneByIdAndUpdate(
                id,
                {
                    $set: {
                        "orders.$[index].state": "Done",
                    },
                },
                {
                    arrayFilters: [{ "index.table": table }],
                    new: true,
                }
            );

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = StaffService;
