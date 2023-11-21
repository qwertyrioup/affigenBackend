




// create post

import Post from "../models/Post.js";

export const create = async (req, res, next) => {
    try {
     
      const newPost = new Post({userId: req.body.userId, title: req.body.title, dsc: req.body.dsc, price: req.body.price});
  
      const savedPost = await newPost.save();
      res.status(200).send(savedPost);
    } catch (err) {
      next(err);
    }
  };



  export const getAll = async (req, res, next) => {
    try {
     
      const posts = await Post.find().sort({createdAt: -1});
  
     
      res.status(200).send(posts);
    } catch (err) {
      next(err);
    }
  };


  export const deletepost = async (req, res, next) => {
    try {
      const product = await Post.findById(req.params.id);
      if (!product) return next(createError(404, "Post not found!"));
    
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("The Post has been deleted.");
   
    } catch (err) {
      next(err);
    }
  };