const Post = require("../models/Post");
const User = require('../models/User');
const Comment = require('../models/Comment');
const auth = require("../auth");


module.exports.getAllComment = async (req, res) => {
    try {
        const comments = await Comment.find().populate("post"); // Populate post details

        if (comments.length === 0) {
            return res.status(404).json({ success: false, message: "No comments found" });
        }

        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports.addComment = async (req, res) => {
    try {
        const { content, author, post } = req.body;

        
        if (!post) {
            return res.status(400).json({ success: false, message: "Post ID is required" });
        }

     
        const newComment = new Comment({ content, author, post });
        const savedComment = await newComment.save();

        
        await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } });

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: savedComment
        });

    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Error adding comment", error: error.message });
    }
};



module.exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id); // Ensure correct parameter name

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await Post.findByIdAndUpdate(deletedComment.post, {
      $pull: { comments: deletedComment._id },
    });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error in deleting Comment: ", error);
    return res.status(500).json({ error: "Error in deleting Comment." });
  }
};