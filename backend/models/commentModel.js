const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
