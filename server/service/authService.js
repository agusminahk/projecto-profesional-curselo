const admin = require("firebase-admin");
const joi = require("../config/joi");
const {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
} = require("firebase/auth");

const User = require("../models/User");

class AuthService {
    static async register({ firstName, lastName, email, password, telephone, role, restaurantId }) {
        try {
            const { error, value } = joi.validate({ firstName, lastName, email, password });

            if (!error) {
                const auth = getAuth();
                const fire_user = await createUserWithEmailAndPassword(auth, email, password);

                const {
                    _tokenResponse: { idToken, email: user_email, localId },
                } = fire_user;

                const user = await new User({
                    _id: localId,
                    firstName,
                    lastName,
                    email: user_email,
                    role: role || "admin",
                    telephone,
                    restaurantId,
                }).save();

                const expiresIn = 60 * 60 * 24 * 3 * 3600;

                const sessionCokie = await admin.auth().createSessionCookie(idToken, { expiresIn });

                return { user, sessionCokie, expiresIn };
            }

            return { error: true, data: error };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async login(body) {
        try {
            const expiresIn = 60 * 60 * 24 * 3 * 3600;

            const auth = getAuth();
            await setPersistence(auth, browserSessionPersistence);
            const fire_user = await signInWithEmailAndPassword(auth, body.email, body.password);

            const {
                _tokenResponse: { email, idToken },
            } = fire_user;

            const sessionCokie = await admin.auth().createSessionCookie(idToken, { expiresIn });
            const [user] = await User.find({ email });

            return { user, sessionCokie, expiresIn };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = AuthService;
