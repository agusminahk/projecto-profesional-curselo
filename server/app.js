const express = require('express');
const session = require('express-session');
const volleyball = require('volleyball');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/');
const client = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(volleyball);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600 * 24 * 60 * 60 * 365,
        },
    })
);

app.use('/api', router);

client.then(() => {
    //setupController();
    app.listen(process.env.PORT || 8080, () => {
        console.log('Backend server is running on http://localhost:8080');
    });
});
