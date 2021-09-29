const mongoose = require("mongoose");

const issueSchema = mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("IssueMessage", issueSchema);
