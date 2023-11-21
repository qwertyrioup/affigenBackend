import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";



// Sign Up
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(200).send(others);
  } catch (err) {
    next(err);
  }
};


// sign In
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

// update user

export const updateUser = async (req, res, next) => {
  const pass = req.body.password
  try {
    
    if (pass) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
   
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { ...req.body, password: hash },
        },
        { new: true }
      );
      const { password, ...others } = updatedUser._doc;
      
      
      
      
      res.status(200).json(others);
      
    } else {
      const t = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email}
        },
        { new: true }
      );
      const { password, ...others } = t._doc;

      res.status(200).json(others);
    }
    
  } catch (err) {
    next(err);
  }
};




// get all users

export const findAll = async (req, res, next) => {
  try {
    const users = await User.find()
    if (!users) return next(createError(404, "No users!"));

    

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};


export const getUserCount = async (req, res, next) => {
  let data;
  try {
    const users = await User.count();
    if (!users) return next(createError(404, "users not found!"));
  
   data = users
    res.status(200).json(data);
 
  } catch (err) {
    next(err);
  }
};


//delete user
export const deleteUser = async (req, res, next) => {
  let hash = req.params.id;
  try {
    const users = await User.findByIdAndDelete(hash);
    
  

    res.status(200).json("User Deleted Successfully !");
 
  } catch (err) {
    next(err);
  }
};



