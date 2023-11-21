import Category from "../models/Category.js";

export const getAll = async (req, res, next) => {
    // let {start, end} = req.query;
  
    try {
        const categories = await Category.find().distinct('category')
        res.status(200).json(categories);
      } catch (err) {
        next(err);
      }
  };