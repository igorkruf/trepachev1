let mongoose = require("mongoose");

let postSchema = new mongoose.Schema(
  {
    textPost: String,
  },
  {
    versionKey: false, //иначе добавляется поле "__v" в каждый документ
    collection: "posts",
  }
);
let Post = mongoose.model("Post", postSchema);
module.exports = Post;
