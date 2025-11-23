import { UserModel } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const logOutUser = AsyncHandler(async (req, res) => {
    //find the user if logged in 
    // clear the cookies and access token from client 
    // clear refresh on server end 
    // NOTE: here directly we didn't have access to the token,so we inject an user object to the req body by auth middleware so that req.user is accessible and inside it we have the user details and that details are filled and pre verified by jwt and we have the accessToken 
    await UserModel.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, {
        new: true
    });
    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});
export { logOutUser };