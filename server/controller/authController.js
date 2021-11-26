const admin = require('firebase-admin');
const {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
} = require('firebase/auth');

const AuthService = require('../service/authService');

class AuthController {
    static async register(req, res) {
        try {
            const options = { maxAge: expiresIn, httpOnly: true };
            const { user, sessionCokie } = await AuthService.register(req.body);

            if (user._id) {
                res.cookie('session', sessionCokie, options);
                res.cookie('user', user, options);

                return res.status(201).json({ status: 'success', user });
            }

            return res.status(401).send('Error at Register!');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const options = { maxAge: expiresIn, httpOnly: true };
            const { user, sessionCokie } = await AuthService.login(req.body);

            if (user._id) {
                res.cookie('session', sessionCokie, options);
                res.cookie('user', user, options);

                return res.status(200).json({ status: 'success', user });
            }
            return res.status(401).send('Error at Login!');
        } catch (error) {
            return res.status(401).send('UNAUTHORIZED REQUEST!');
        }
    }

    static async logout(req, res) {
        res.clearCookie('session');
        return res.json({ session: 'clear' });
    }
}

module.exports = AuthController;
