import { Schema, model, Types } from 'mongoose';
import { UserModel } from './user.model.js';
const ContentSchema = new Schema({
    title: String,
    content: String,
    link: String,
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: {
        type: Types.ObjectId,
        ref: UserModel,
        required: true
    },
    category: String
});
export const ContentModel = model("Content", ContentSchema);
