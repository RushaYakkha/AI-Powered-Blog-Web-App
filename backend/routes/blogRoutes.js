import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById,getRecommendations, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import { searchBlogs } from "../controllers/blogController.js";

const blogRouter = express.Router();
blogRouter.post("/add",upload.single('image'),auth ,addBlog)
blogRouter.get("/all",getAllBlogs)
blogRouter.get("/:id/recommendations", getRecommendations);
blogRouter.get("/search", searchBlogs)
blogRouter.get("/:blogId",getBlogById)
blogRouter.post("/delete",auth,deleteBlogById)//only admin can delete this blog
blogRouter.post("/toggle-publish",auth,togglePublish)
blogRouter.post("/add-comment",addComment)
blogRouter.post("/comments",getBlogComments)
blogRouter.post("/generate",auth,generateContent)



export default blogRouter;