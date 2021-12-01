const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, server } = require("../app");

const api = supertest(app);

const initialAuth = ["crear los objetos"]

beforeEach(async () => {
    // borrar la data

    // insertar la data
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
});
