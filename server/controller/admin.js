const AdminService = require('../service/admin');

class AdminController {
    static async search(req, res) {
        const { type, id } = req.query;

        const { error, data } = await AdminService.search(type, id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async createRestaurant(req, res) {
        const { error, data } = await AdminService.createRestaurant(req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async createProduct(req, res) {
        const { error, data } = await AdminService.createProduct(req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async createCategory(req, res) {
        const { error, data } = await AdminService.createCategory(req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async createStaff(req, res) {
        const { error, data } = await AdminService.createStaff(req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async updateRestaurant(req, res) {
        const { error, data } = await AdminService.updateRestaurant(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async updateProduct(req, res) {
        const { error, data } = await AdminService.updateProduct(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async updateCategory(req, res) {
        const { error, data } = await AdminService.updateCategory(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async updateUser(req, res) {
        const { error, data } = await AdminService.updateUser(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async uploadImage(req, res) {
        const { error, data } = await AdminService.uploadImage();

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async deleteProduct(req, res) {
        const { error, data } = await AdminService.deleteProduct(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async deleteCategory(req, res) {
        const { error, data } = await AdminService.deleteCategory(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async deleteStaff(req, res) {
        const { error, data } = await AdminService.deleteStaff(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }
}

module.exports = AdminController;
