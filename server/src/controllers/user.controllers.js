import { UserModel } from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import jwt from "jsonwebtoken";
import { ApiResponse } from '../utils/ApiResponse.js';

export async function generateAccessRefreshToken(userId) {
    try {
        const user = await UserModel.findById(userId);
        const accessToken = user?.generateAccessToken();
        const refreshToken = user?.generateRefreshToken();
        if (user) {
            user.refreshToken = refreshToken;
        }
        await user?.save({ validateBeforeSave: false });
        return { accessToken: accessToken,
            refreshToken: refreshToken };
    }
    catch (error) {
        throw new ApiError(500, 'Something went wrong while generating refresh and access tokens');
    }
}

export const refreshAccessToken = AsyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized access");
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
        const user = await UserModel.findById(decodedToken?.id);
        if (!user) {
            throw new ApiError(401, "Invalid refreshToken");
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refreshToken is expired or used");
        }
        const options = {
            httpOnly: true,
            secure: true
        };
        const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, {
            accessToken,
            newRefreshToken: refreshToken
        }, "accessToken refreshed"));
    }
    catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token or it could not be decoded");
    }
});