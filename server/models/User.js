const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    _id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "admin" },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    telephone: { type: String, default: '' },
});

UserSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        // delete returnedObject.password;
    },
});

module.exports = model("User", UserSchema);
