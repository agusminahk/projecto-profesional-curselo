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
    static async register(body) {
        try {
            const { error, value } = joi.validate({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password
            });

            if (!error) {
                const auth = getAuth();
                const fire_user = await createUserWithEmailAndPassword(auth, body.email, body.password);

                const {
                    _tokenResponse: { idToken, error, email, localId },
                } = fire_user;

                const user = await new User({
                    _id: localId,
                    firstname: body.firstname,
                    lastname: body.lastname,
                    email: email,
                    role: body.role || "admin",
                    telephone: body.telephone,
                    restaurantId: body.restaurantId,
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
