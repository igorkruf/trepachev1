const express = require("express");
const postController = require("../controllers/postController.js");
const postRouter = express.Router();

postRouter.get("/list", postController.listPost);
postRouter.post("/add", postController.addPost);
postRouter.get("/list/:id", postController.selectPostId);
postRouter.put("/change/:id", postController.changePost);
postRouter.delete("/delete/:id", postController.deletePost);
postRouter.get("/find", postController.selectPostStr);
module.exports = postRouter;
