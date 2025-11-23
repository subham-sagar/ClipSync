import { Router } from "express";
import { ContentModel } from "../models/content.model.js";

const router = Router();

// Public dashboard
router.get("/public/dashboard/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const contents = await ContentModel.find({ userId });

        res.json({
            success: true,
            data: contents
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
});

export default router;
