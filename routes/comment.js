const express = require("express");
const commentController = require("../controllers/comment");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();



router.get("/getComments", verify, commentController.getAllComment);
router.post("/addComment", verify, commentController.addComment);
router.get("/getComment/:id", verify, commentController.getCommentById);
router.delete("/deleteComment/:id", verify, verifyAdmin, commentController.deleteComment);


module.exports = router;