import { Router } from 'express';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import signIn from '../middleware/signin.middleware.js';
import signUp from '../middleware/signup.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { linkModel } from '../models/share.models.js';
import { ContentModel } from '../models/content.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { UserModel } from '../models/user.model.js';


const router = Router();
router.post('/signup', (req, res, next) => {
    console.log("signup here");
    next();
}, AsyncHandler(signUp));


router.post('/signin', AsyncHandler(signIn));

router.post('/brain/share', verifyJWT, AsyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    let hash = '';
    const share = req.body.share;
    if (share) {
        let options = 'abcdefghijklmnopqr01234stuvwxyz56789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 10; i++) {
            hash += options[Math.floor(Math.random() * options.length)];
        }
        // Create the share link
        const shareLink = await linkModel.create({
            hash,
            userId,
        });
    }
    else {
        await linkModel.deleteOne({
            userId: req.user._id,
        });
        return res.status(200).json(new ApiResponse(201, {}, 'Share link disabled'));
    }


    // Verify the content exists and belongs to the user
    // Generate a unique hash for the share link
    return res
    
        .status(200)
        .json(new ApiResponse(200, { shareLink: `${req.protocol}://${req.get('host')}/api/v1/user/brain/${hash}` }, 'Share link created successfully'));
}));

// Access a shared content using the hash
router.get('/brain/:shareLink', AsyncHandler(async (req, res, next) => {
    const hash = req.params.shareLink;
    // Find the share link
    const shareLink = await linkModel.findOne({ hash });
    if (!shareLink) {
        return res.status(404).json({
            success: false,
            message: 'Share link not found or has expired',
        });
    }
    // Fetch the content
    const content = await ContentModel.find({ userId: shareLink.userId });
    if (!content) {
        return res.status(404).json({
            success: false,
            message: 'Content not found or has been deleted',
        });
    }
    const user = await UserModel.findById(shareLink.userId).select('-password -refreshToken');
    return res
        .status(200)
        .json(new ApiResponse(200, { username: user?.username, content }, 'Content retrieved successfully'));
}));


// PUBLIC - anyone can view a single content
router.get(
  '/public/:contentId',
  AsyncHandler(async (req, res) => {
    const { contentId } = req.params;

    const content = await ContentModel.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json({ content });
  })
);

export default router;
