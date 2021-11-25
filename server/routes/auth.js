const router = require('express').Router();
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
const verify = require('../middlewares/auth');

router.post('/login', async function (req, res) {
    try {
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);
        const user = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);

        const token = user._tokenResponse.idToken;
        const expiresIn = 60 * 60 * 24 * 3 * 3600;
        const options = { maxAge: expiresIn, httpOnly: true };

        const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });

        res.cookie('session', sessionCookie, options);
        return res.json({ status: 'success' });
    } catch (error) {
        return res.status(401).send('UNAUTHORIZED REQUEST!');
    }
});

router.post('/register', async function (req, res) {
    const auth = getAuth();
    const fire_user = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    const {
        _tokenResponse: { idToken, email, localId },
    } = fire_user;
    const user = {
        _id: localId,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: email,
        role: req.body.role || 'admin',
        telephone: req.body.telephone,
    };
    const mongo_user = new User(user);
    await mongo_user.save();

    const expiresIn = 60 * 60 * 24 * 3 * 3600;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie('session', idToken, options);
                return res.end(JSON.stringify({ status: 'success' }));
            },
            (error) => {
                return res.status(401).send('UNAUTHORIZED REQUEST!');
            }
        );

    return res.send(user);
});

router.get('/me', verify, function (req, res) {
    return res.send('ESTOY AUTORIZADO. ');
});

router.post('/sessionLogin', (req, res) => {
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie('session', sessionCookie, options);
                return res.send(JSON.stringify({ status: 'success' }));
            },
            (error) => {
                res.status(401).send('UNAUTHORIZED REQUEST!');
            }
        );
});

router.get('/logout', (req, res) => {
    res.clearCookie('session');
    return res.json({ session: 'clear' });
});

module.exports = router;
