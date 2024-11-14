var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const path = require("path");
const Post = require("../models/Post")

var id;
const showHomePage = async (req, res) => {
    
    const posts = await Post.find();
    res.render("app.ejs", {posts})
}

const createPost = (req, res) => {
    res.render("create-post.ejs")
}

const storePost = /*async*/ (req, res) => {
    try {
        if (req.files) {
            const {image} = req.files;
            image.mv(path.resolve(__dirname, '..', 'public/posts', image.name));
            // Tạo post trong database
            Post.create({
                ...req.body,
                image: `/posts/${image.name}`
            })
        } else {
            Post.create({
                ...req.body
            })
        }

        console.log("Succesfull")       
        res.redirect("/")
    } catch (error) {
        console.log("Failed")
        console.log(error);
    }
}

const deletePost = async (req, res) => {
    await Post.findOneAndDelete(req.params.ObjectId);
    console.log("Đã xóa thành công")
    res.redirect("/")
}

const editPost = async (req, res) => {
    id = req.params.ObjectId;
    const post = await Post.findById(req.params.ObjectId)

    res.render("edit-post.ejs", {post})

}

const updatePost = async (req, res) => {
            const now = new Date();
            const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
            
            if (req.files) {
                const {image} = req.files;
                image.mv(path.resolve(__dirname, '..', 'public/posts', image.name));
                // Cập nhật post trong database
                await Post.updateOne(
                    {_id: id},
                    {
                        $set: {
                            title: req.body.title,
                            description: req.body.description,
                            content: req.body.content,
                            username: req.body.username,
                            image: `/posts/${image.name}`,
                            createdAt: vietnamTime
                        }
                    }
                )
            } else {
                await Post.updateOne(
                    {_id: id},
                    {
                        $set: {
                            title: req.body.title,
                            description: req.body.description,
                            content: req.body.content,
                            username: req.body.username,
                            createdAt: vietnamTime
                        }
                    }
                )
            }
            console.log("Đã update thành công")
            res.redirect("/")
            
}

const showPost = async (req, res) => {
    const post = await Post.findById(req.params.ObjectId)
    res.render("post.ejs", {post})
}

module.exports = {
    showHomePage, createPost, storePost, showPost, deletePost, editPost, updatePost
}


