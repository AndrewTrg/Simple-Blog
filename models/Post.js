

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const now = new Date();


const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        
    },

    createdAt: {
        type: Date,
        default: vietnamTime,
    },
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


