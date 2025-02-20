const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
//Routes Middleware
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

// app.use(cors({ 
//   origin: "http://localhost:3000", // Allow frontend
//   credentials: true // Allow cookies/session
// }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,POST,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://ivanacuna055:admin123@cluster0.bcl9r.mongodb.net/blog-API?retryWrites=true&w=majority&appName=Cluster0");

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
}

module.exports = {app,mongoose};