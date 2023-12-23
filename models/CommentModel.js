const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  Photo: {
    type: String,
    required: true,
  },
  replies: [{
    username: {
      type: String,
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      validate: {
        validator: function (value) {
          return value || this.url; // Either text or url must be present
        },
        message: 'Either "text" or "url" must be present',
      },
    },
    url: {
      type: String,
      validate: {
        validator: function (value) {
          return value || this.text; // Either text or url must be present
        },
        message: 'Either "text" or "url" must be present',
      },
    },
    createdAt: {
      type: Date,
      default: new Date().getTime(),
    },
    Photo: {
      type: String,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Comment', commentSchema);
