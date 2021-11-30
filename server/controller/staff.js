const StaffService = require("../service/staff");

class StaffController {
    static async getOrders(req, res) {
        const { error, data } = await StaffService.getOrders(req.params.id);

        error ? res.status(data.status || 500).send({ message: data.message }) : res.json(data);
    }

    static async preparingOrder(req, res) {
        const { table } = req.query;

        const { error, data } = await StaffService.preparingOrder(req.params.id, table);

        error ? res.status(data.status || 500).send({ message: data.message }) : res.json(data);
    }

    static async completeOrder(req, res) {
        const { table } = req.query;

        const { error, data } = await StaffService.completeOrder(req.params.id, table);

        error ? res.status(data.status || 500).send({ message: data.message }) : res.json(data);
    }
}

module.exports = StaffController;
