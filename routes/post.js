const express = require("express");
const postController = require("../controllers/post");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
// router.get("/getMovies", verify, movieController.getAllMovies);
// router.get("/getMovie/:id", verify, movieController.getMovieById);
// router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
// router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);
// router.patch("/addComment/:id", verify, movieController.addMovieComment);
// router.get("/getComments/:id", verify, movieController.getMovieComments);

// router.get("/all", verify, verifyAdmin, postController.getAllPost);
// router.get("/specific/:postId", postController.getPostId);
router.get("/getPosts", verify, postController.getAllPost);
router.get("/getPost/:id", verify, postController.getPostById);
router.post("/addPost", verify, verifyAdmin, postController.addPost);
router.patch("/updatePost/:id", verify, verifyAdmin, postController.updatePost);
router.delete("/deletePost/:id", verify, verifyAdmin, postController.deletePost);


module.exports = router;