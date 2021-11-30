const AuthService = require('../service/authService');

class AuthController {
    static async register(req, res) {
        try {
            const { user, sessionCokie, expiresIn } = await AuthService.register(req.body);
            const options = { maxAge: expiresIn, httpOnly: true };

            if (user.email) {
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
            const { user, sessionCokie, expiresIn } = await AuthService.login(req.body);
            const options = { maxAge: expiresIn, httpOnly: true };

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
