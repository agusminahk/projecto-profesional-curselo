const admin = require("firebase-admin");

const verify = (req, res, next) => {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(({ email }) => (email ? next() : res.status(401).send("UNAUTHORIZED")))
        .catch((e) => res.status(401).send("UNAUTHORIZED"));
};

const checkAuthAdmin = (req, res, next) => (req.cookies.user.role === "admin" ? next() : res.status(401).send("unauthorized"));

const checkAuthSuperAdmin = (req, res, next) =>
    req.cookies.user.role === "superAdmin" ? next() : res.status(401).send("unauthorized");

module.exports = { verify, checkAuthAdmin, checkAuthSuperAdmin };
