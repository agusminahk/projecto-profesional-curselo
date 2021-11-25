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
            const auth = getAuth();
            const fire_user = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
            const mongo_user = await AuthService.register(req.body, fire_user);
            const token = fire_user._tokenResponse.idToken;

            if (mongo_user._id) {
                const expiresIn = 60 * 60 * 24 * 3 * 3600;
                const sessionCokie = await admin.auth().createSessionCookie(token, { expiresIn });
                const options = { maxAge: expiresIn, httpOnly: true };

                res.cookie('session', sessionCokie, options);
                res.cookie('user', mongo_user, options);

                return res.status(201).send(mongo_user);
            }

            return res.status(401).send('UNAUTHORIZED REQUEST!');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const auth = getAuth();
            await setPersistence(auth, browserSessionPersistence);
            const fire_user = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);

            const {
                _tokenResponse: { email, idToken },
            } = fire_user;
            const [mongo_user] = await AuthService.login(email);

            const expiresIn = 60 * 60 * 24 * 3 * 3600;
            const options = { maxAge: expiresIn, httpOnly: true };

            const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
            res.cookie('session', sessionCookie, options);
            res.cookie('user', mongo_user, options);

            return res.json({ status: 'success' });
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
