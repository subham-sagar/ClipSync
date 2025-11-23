import mongoose, { model } from "mongoose";
const LinkSchema = new mongoose.Schema({
    hash: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: '30d' } // Optional: auto-expire links after 30 days
});
export const linkModel = model("shareLinks", LinkSchema);