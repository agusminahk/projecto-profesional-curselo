const express = require('express');
const session = require('express-session');
const volleyball = require('volleyball');
const cors = require('cors');
const router = require('./routes/');
const client = require('./config/db');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');
require('./config/firebase-config');

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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://curselo-7d35c.firebaseio.com',
});

app.use('/api', router);

client.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log('Backend server is running on http://localhost:8080');
    });
});
