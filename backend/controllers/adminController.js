import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
export const adminLogin = async(req , res)=>{
    try {
        const {email,password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(404).json({
                message : "Invalid credentials",
                success : false
            })
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({
            success:true,
            token
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }

}
// Function:Admin can see all the published or unpublished Blog in Admin dashboard
export const getAllBlogsAdmin = async(req,res)=>{
    try {
        const blog = await Blog.find({}).sort({createdAt:-1})
          res.json({
            success:true,
            blog
        })
    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }
}

// Admin can see all comments and can either approve or unapprove
export const getAllComments = async(req,res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createAt:-1})
         res.json({
            success:true,
            comments
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Admin get all the Dashboard datas
export const getDashboard = async(req,res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({creatdAt:-1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished:false})



        const dashboardData = {
            recentBlogs, blogs , comments, drafts 
        }
         res.json({
            success:true,
            dashboardData
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Function:Admin delete  comment
export const deleteCommentById = async (req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndDelete(id);
         res.json({
            success:true,
            message:"Comment deleted successfully"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Function:Admin  approve comment
export const approveCommentById = async (req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndUpdate(id,{isApproved:true});
         res.json({
            success:true,
            message:"Comment approved successfully"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}