const User = require('../models/User');

class AuthService {
    static async register(body, user) {
        try {
            const {
                _tokenResponse: { email, localId },
            } = user;

            const newUser = {
                _id: localId,
                firstname: body.firstName,
                lastname: body.lastName,
                email: email,
                role: body.role || 'admin',
                telephone: body.telephone,
            };
            const mongo_user = new User(newUser);
            return await mongo_user.save();
        } catch (error) {
            console.log(error);
        }
    }

    static async login(email) {
        try {
            return await User.find({ email });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AuthService;
