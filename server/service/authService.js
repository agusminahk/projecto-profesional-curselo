const admin = require('firebase-admin');
const {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
} = require('firebase/auth');

const User = require('../models/User');

class AuthService {
    static async register(body) {
        try {
            const auth = getAuth();
            const fire_user = await createUserWithEmailAndPassword(auth, body.email, body.password);

            const {
                _tokenResponse: { idToken, email, localId },
            } = fire_user;

            const newUser = {
                _id: localId,
                firstname: body.firstName,
                lastname: body.lastName,
                email: email,
                role: body.role || 'admin',
                telephone: body.telephone,
            };

            const user = await new User(newUser).save();

            const expiresIn = 60 * 60 * 24 * 3 * 3600;
            const sessionCokie = await admin.auth().createSessionCookie(idToken, { expiresIn });

            return { user, sessionCokie };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async login(email) {
        try {
            const expiresIn = 60 * 60 * 24 * 3 * 3600;
            const auth = getAuth();
            await setPersistence(auth, browserSessionPersistence);
            const fire_user = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);

            const {
                _tokenResponse: { email, idToken },
            } = fire_user;

            const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
            const user = await User.find({ email });

            return { user, sessionCookie };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = AuthService;
