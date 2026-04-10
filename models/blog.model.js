
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String
    },

    content: {
        type: String,

    },
    category: {
        type: String,
        enum: ['technology', 'lifestyle', 'travel', 'food', 'education', 'health', 'finance', 'entertainment', 'sports', 'fashion', 'other'],
        default: 'other',
    },
    excerpt: {
        type: String,
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
    },

    publishedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;