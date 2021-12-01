const AdminService = require("../service/admin");

class AdminController {
    static async search(req, res) {
        const { type, id } = req.query;

        const { error, data } = await AdminService.search(type, id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async confirmPurchase(req, res) {
        const { id, table } = req.query;

        const { error, data } = await AdminService.confirmPurchase(id, table, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async confirmOrder(req, res) {
        const { id, table } = req.query;

        const { error, data } = await AdminService.confirmOrder(id, table);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async dailyClosing(req, res) {
        const { id } = req.query;

        const { error, data } = await AdminService.dailyClosing(id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async createRestaurant(req, res) {
        const { error, data } = await AdminService.createRestaurant(req.body, req.cookies.user);

        return error ? res.status(400).send({ message: data }) : res.status(201).json(data);
    }

    static async createProduct(req, res) {
        const { error, data } = await AdminService.createProduct(req.body);

        return error ? res.status(400).send({ message: data }) : res.status(201).json(data);
    }

    static async createCategory(req, res) {
        const { error, data } = await AdminService.createCategory(req.body);

        return error ? res.status(400).send({ message: data }) : res.status(201).json(data);
    }

    static async createSubCategory(req, res) {
        const { error, data } = await AdminService.createSubCategory(req.body);

        return error ? res.status(400).send({ message: data }) : res.status(201).json(data);
    }

    static async updateRestaurant(req, res) {
        const { error, data } = await AdminService.updateRestaurant(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.status(201).json(data);
    }

    static async updateProduct(req, res) {
        const { error, data } = await AdminService.updateProduct(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.status(201).json(data);
    }

    static async updateCategory(req, res) {
        const { error, data } = await AdminService.updateCategory(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.status(201).json(data);
    }

    static async updateSubCategory(req, res) {
        const { id, name } = req.params;

        const { error, data } = await AdminService.updateSubCategory(id, name, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.status(201).json(data);
    }

    static async updateUser(req, res) {
        const { error, data } = await AdminService.updateUser(req.params.id, req.body);

        return error ? res.status(data.status || 500).send({ message: data }) : res.status(201).json(data);
    }

    static async uploadImage(req, res) {
        const { filename, destination } = req.file;

        return !filename ? res.status(500).send("Upload Error") : res.status(201).json({ filename, destination });
    }

    static async deleteProduct(req, res) {
        const { error, data } = await AdminService.deleteProduct(req.params.id, req.cookies.user);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async deleteCategory(req, res) {
        const { error, data } = await AdminService.deleteCategory(req.params.id, req.cookies.user);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async deleteSubCategory(req, res) {
        const { id, name } = req.params;

        const { error, data } = await AdminService.deleteSubCategory(id, name);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }

    static async deleteStaff(req, res) {
        const { error, data } = await AdminService.deleteStaff(req.params.id);

        return error ? res.status(data.status || 500).send({ message: data }) : res.json(data);
    }
}

module.exports = AdminController;
