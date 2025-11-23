import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Password is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String
    }
});


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) { //available method in mongoose 
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const JWT_SECRET = process.env.JWT_SECRET;
UserSchema.methods.generateRefreshToken = function () {
    const refreshToken = jwt.sign({
        id: this._id,
        username: this.username
    }, JWT_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '1d'
    });
    return refreshToken;
};

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        username: this.username
    }, JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    });
};
export const UserModel = model("User", UserSchema);