const SuperAdminService = require("../service/superAdmin");

class SuperAdminController {
    static async enableClient(req, res) {
        const { error, data } = await SuperAdminService.enableClient(req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }
    
    static async enableClient(req, res) {
        const { error, data } = await SuperAdminService.enableClient(req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async disableClient(req, res) {
        const { error, data } = await SuperAdminService.disableClient(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async getMetrics(req, res) {
        const { error, data } = await SuperAdminService.getMetrics();

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }
}

module.exports = SuperAdminController;
