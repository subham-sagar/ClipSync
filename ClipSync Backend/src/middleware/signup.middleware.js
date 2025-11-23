import { UserModel } from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { signupSchema } from '../zodSchema/validationSchema.js';

const signUp = async (req, res, next) => {
    console.log("⚠️ signup request body:", req.body);

    try {
        console.log("➡️ inside signup logic");

        const validateInput = await signupSchema.safeParseAsync(req.body);
        console.log("zod validation result:", validateInput);

        if (!validateInput.success) {
            const errors = validateInput.error?.issues.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            console.log("❌ zodError");
            return res.status(400).json(new ApiError(400, 'zodError', errors));
        }

        const { username, password } = req.body;

        // check if user exists
        const existedUser = await UserModel.findOne({ username });
        if (existedUser) {
            console.log("❌ User already exists");
            throw new ApiError(401, 'User already exists');
        }

        // Use .save() to trigger hashing
        const user = new UserModel({ username, password });
        await user.save();

        console.log("✅ User created successfully");

        res.status(200).json({
            message: 'User created successfully.',
        });

    } catch (err) {
        console.log("❌ SIGNUP ERROR:", err);
        next(err);
    }
};


export default signUp;
