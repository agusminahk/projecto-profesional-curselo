const admin = require('firebase-admin');

const verify = (req, res, next) => {
    const sessionCookie = req.cookies.session || '';
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(({ email }) => (email ? next() : res.status(401).send('UNAUTHORIZED')))
        .catch((e) => res.status(401).send('UNAUTHORIZED'));
};

module.exports = verify;
