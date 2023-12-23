const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    imgurl: {
      type: String,
      default: "default_image_url_here", // Provide a default value
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);