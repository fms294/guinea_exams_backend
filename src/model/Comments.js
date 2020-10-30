const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  lesson_name: {
    type: String,
    required: true,
    trim: true
  },
  commentDescription: {
    type: String,
    trim: true
  }
}, { timeStamp: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
