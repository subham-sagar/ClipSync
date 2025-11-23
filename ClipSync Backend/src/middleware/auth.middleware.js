// import jwt from "jsonwebtoken";
// import { UserModel } from "../models/user.model.js";
// import { AsyncHandler } from "../utils/AsyncHandler.js";
// import ApiError from "../utils/ApiError.js";

// const verifyJWT = AsyncHandler(async (req, res, next) => {
//     const token = req.body?.accessToken || req.cookies?.accessToken || req.header("Authorization");
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized - No token provided" });
//     }
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await UserModel.findById(decodedToken.id).select("-password -refreshToken");
//     if (!user) {
//         throw new ApiError(401, "Unauthorised access");
//     }
//     req.user = user;
//     next();
// });
// export { verifyJWT };

import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        // Missing header?
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Format must be Bearer <token>
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Invalid token format" });
        }

        const token = authHeader.split(" ")[1];

        // Empty/Invalid token?
        if (!token || token === "null" || token === "undefined") {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        // Verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Expired or invalid token" });
    }
};
