const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { NODE_ENV, MONGODB_HOST, MONGODB_HOST_TEST } = process.env;

const conecctionString = NODE_ENV === "test" ? MONGODB_HOST_TEST : MONGODB_HOST;


const client = mongoose
    .connect(conecctionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((e) => console.log("MongoDB Error: " + e));

module.exports = client;
