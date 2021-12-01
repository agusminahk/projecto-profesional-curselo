const router = require('express').Router();
const AuthController = require('../controller/authController');
const {verify} = require('../middlewares/auth');

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

router.get('/me', verify, (req, res) => res.send(req.cookies.user));

router.get('/logout', AuthController.logout);

module.exports = router;
