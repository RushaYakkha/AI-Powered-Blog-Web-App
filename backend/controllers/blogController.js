// Here Controller list of new blog post,add new blog post
import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async(req,res)=>{
    try {
        const {title , subtitle, description, category,isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;


        // Check if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.status(400).json({
                message : "Missing required fields",
                success : false
            })
    }

// Upload images into cloudanary

const fileBuffer = fs.readFileSync(imageFile.path)
// Upload image to imageKit
const response = await imagekit.upload({
    file : fileBuffer,
    fileName : imageFile.originalname,
    folder:"/blogs"
})

// optimize through imageKit URL transformation
const optimizedImageUrl = imagekit.url({
    path : response.filePath,
    transformation:[
        {quality:'auto'},//Auto Compression
        {format : 'webp'},//convert to modern format
        {width : '1280'}//width resize
    ]
});
const image = optimizedImageUrl;
await Blog.create({title,subtitle,description,category,image,isPublished})
res.json({
    message :"Blog added successfully",
    success:true
})
}
    catch (error) {
        res.json({
            message:error.message,
            success : false
        })
    }
}


export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({
          blogs,
            success:true
        })
    } catch (error) {
        res.json({
            message : error.message,
            success:false
        })
    }
}
    export const getBlogById = async(req,res)=>{
        try {
            const {blogId} = req.params;
            const blog = await Blog.findById(blogId)
            if(!blog){
                return res.status(400).json({
                    message : "Blog not found",
                    success :false
                })
            }
            res.json({
          blog,
            success:true
        })
        } catch (error) {
        res.json({
            message : error.message,
            success:false
        })
    }
    }

// function to delete any blog
      export const deleteBlogById = async(req,res)=>{
        try {
            const {id} = req.body;
            await Blog.findByIdAndDelete(id);

// Delete all comment associated with blog
            await Comment.deleteMany({blog:id});



            res.json({
          message : "Blog deleted successfully",
            success:true
        })
        } catch (error) {
        res.json({
            message : error.message,
            success:false
        })
    }
    }


    // Function to publish or unpublish Blog
    export const togglePublish = async(req,res)=>{
        try {
            const {id} = req.body;
            const blog = await Blog.findById(id);
            blog.isPublished = !blog.isPublished;
            await blog.save();
             res.json({
          message : "Blog status updated successfully",
            success:true
        })
        } catch (error) {
            res.json({
            message : error.message,
            success:false
        })
        }
    }


    export const addComment = async(req,res)=>{
        try {
            const {blog,name,content} = req.body;
            await Comment.create({blog,name,content});
             res.json({
            message : "Comment added for review",
            success:true
        })
        } catch (error) {
            res.json({
            message : error.message,
            success:false
        })
        }
    }



    export const getBlogComments = async(req,res)=>{
        try {
            const {blogId} = req.body;
            const comments = await Comment.find({blog:blogId, isApproved:true}).sort({createdAt:-1});
             res.json({
            comments,
            success:true
        })
        } catch (error) {
            res.json({
            message : error.message,
            success:false
        })
        }

    }



// generate content
export const generateContent = async(req,res)=>{
    try {
        const{prompt}=req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')

        res.json({success:true,content})
    } catch (error) {
         res.json({success:false,message: error.message})
    }
}