const ClientService = require("../service/client");

class ClientController {
    static async search(req, res) {
        const { type, name } = req.query;

        const { error, data } = await ClientService.search(req.params.id, type, name);

        error ? res.status(data.status || 404).send({ message: data.message }) : res.json(data);
    }

    static async postOrder(req, res) {
        const { error, data } = await ClientService.postOrder(req.body, req.params.id);

        error ? res.status(data.status || 500).send({ message: data.message }) : res.json(data);
    }
}

module.exports = ClientController;
