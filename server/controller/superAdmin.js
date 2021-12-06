const SuperAdminService = require('../service/superAdmin');

class SuperAdminController {
    static async enableClient(req, res) {
        const { error, data } = await SuperAdminService.enableClient(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async disableClient(req, res) {
        const { error, data } = await SuperAdminService.disableClient(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async deleteClient(req, res) {
        const { error, data } = await SuperAdminService.deleteClient(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async getClients(req, res) {
        const { error, data } = await SuperAdminService.getClients(req.query);

        return error ? res.status(data.status || 404).send({ message: data }) : res.json(data);
    }

    static async getMetrics(req, res) {
        const { error, data } = await SuperAdminService.getMetrics();

        return error ? res.status(data.status || 404).send({ message: data }) : res.json(data);
    }
}

module.exports = SuperAdminController;
