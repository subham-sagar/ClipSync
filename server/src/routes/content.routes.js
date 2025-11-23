// import { Router } from 'express';
// import { AsyncHandler } from '../utils/AsyncHandler.js';
// import { verifyJWT } from '../middleware/auth.middleware.js';
// import { ContentModel } from '../models/content.model.js';
// import { ApiResponse } from '../utils/ApiResponse.js';
// import { linkModel } from '../models/share.models.js';

// const router = Router();

// router.post(
// 	'/',
// 	verifyJWT,
// 	AsyncHandler(async (req, res, next) => {
// 		const link = req.body.link;
// 		const title = req.body.title;
// 		const content = req.body.content;
// 		const tags = req.body.tags;
// 		const userId = req.user._id;
// 		const category = req.body.category
// 		await ContentModel.create({
// 			link,
// 			title,
// 			content,
// 			tags,
// 			userId,
// 			category
// 		});

// 		return res.json({
// 			message: 'content added',
// 		});
// 	})
// );
// router.get(
// 	'/',
// 	verifyJWT,
// 	AsyncHandler(async (req, res, next) => {
// 		const userId = req.user._id;
// 		const contents = await ContentModel.find({ userId: userId }).populate('userId', 'username');

// 		res.json(
// 			new ApiResponse(
// 				200,
// 				{
// 					contents,
// 				},
// 				'contents fetched successfully'
// 			)
// 		);
// 	})
// );


// // Get a single content by ID
// router.get(
//     '/:contentId',
//     verifyJWT,
//     AsyncHandler(async (req, res) => {
//         const { contentId } = req.params;
//         const userId = req.user._id;

//         const content = await ContentModel.findOne({
//             _id: contentId,
//             userId: userId
//         });

//         if (!content) {
//             return res.status(404).json({ message: "Content not found" });
//         }

//         res.json({ content });
//     })
// );

// router.delete(
// 	'/:contentId',
// 	verifyJWT,
// 	AsyncHandler(async (req, res, next) => {
// 		const userId = req.user._id;
// 		const contentId = req.params.contentId;
// 		const contents = await ContentModel.deleteOne({
// 			_id: contentId,
// 			userId,
// 		});

// 		res.json({
// 			message: 'Content deleted succesfully',
// 		});
// 	})
// );



// export default router;



import { Router } from 'express';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { ContentModel } from '../models/content.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

// Create content
router.post(
  '/',
  verifyJWT,
  AsyncHandler(async (req, res) => {
    const { title, link, content, tags, category } = req.body;
    const userId = req.user._id;

    const newContent = await ContentModel.create({
      title,
      link,
      content,
      tags,
      userId,
      category
    });

    return res.json({
      message: "Content added",
      content: newContent
    });
  })
);

// Get all contents for logged-in user
router.get(
  '/',
  verifyJWT,
  AsyncHandler(async (req, res) => {
    const userId = req.user._id;

    const contents = await ContentModel.find({ userId });

    res.json(
      new ApiResponse(
        200,
        { contents },
        "Contents fetched successfully"
      )
    );
  })
);

// Get single content (protected version)
router.get(
  '/:contentId',
  verifyJWT,
  AsyncHandler(async (req, res) => {
    const { contentId } = req.params;
    const userId = req.user._id;

    const content = await ContentModel.findOne({
      _id: contentId,
      userId
    });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.json({ content });
  })
);

// Delete content
router.delete(
  '/:contentId',
  verifyJWT,
  AsyncHandler(async (req, res) => {
    const { contentId } = req.params;
    const userId = req.user._id;

    await ContentModel.deleteOne({ _id: contentId, userId });

    return res.json({ message: "Content deleted successfully" });
  })
);

// PUBLIC: Get all contents of a user
router.get(
  "/public/:userId",
  AsyncHandler(async (req, res) => {
    const { userId } = req.params;

    const contents = await ContentModel.find({ userId });

    if (!contents) {
      return res.status(404).json({ message: "No content found" });
    }

    res.json({
      message: "Public contents fetched successfully",
      contents
    });
  })
);


export default router;
