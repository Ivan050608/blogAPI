const Post = require("../models/Post");
const User = require('../models/User');
const auth = require("../auth");


module.exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("comments"); 

        res.status(200).json({
            success: true,
            count: posts.length,
            posts: posts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("comments") 
            .exec();

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports.addPost = async (req, res) => {
    try {
       
        const existingPost = await Post.findOne({ title: req.body.title });
        if (existingPost) {
            return res.status(409).json({ message: "Post already exists" });
        }

        
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author, // Now accepting the author's name
        });

        // Save the post
        const result = await newPost.save();
        res.status(201).json({ 
            success: true,
            message: "Post added successfully", 
            result: result 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports.updatePost = async (req, res) => {
    try {
        const updatedFields = req.body; 

        const post = await Post.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            updatedPost: post
        });

    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ success: false, message: "Error updating post", error: error.message });
    }
};


module.exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deleting post:", error);
    res.status(500).json({ success: false, message: "Error in deleting post", error: error.message });
  }
};

