import { UserModel } from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateAccessRefreshToken } from '../controllers/user.controllers.js';


export default async function signin(req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({
            username: username,
        });
        if (!user) {
            throw new ApiError(404, "User doesn't exist.");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid credentials.');
        }
        
        const loggedInUser = await UserModel.findById(user._id).select('-password -refreshToken');
        const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);
        const options = {
            httpOnly: true,
            secure: true,
        };
        res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(200, {
            user: loggedInUser,
            accessToken
        }, 'User logged in successfully'));
    }
    catch (error) {
        next(error);
    }
}