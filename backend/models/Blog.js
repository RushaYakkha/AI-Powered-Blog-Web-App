import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

//  full-text search index on title, subtitle, and description
blogSchema.index({ title: "text", subtitle: "text", description: "text" });

const Blog = mongoose.model('blog', blogSchema);
export default Blog;
