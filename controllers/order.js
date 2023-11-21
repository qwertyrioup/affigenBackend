import Order from "../models/Order.js";

import { createError } from "../error.js";


export const createOrder = async (req, res, next) => {
    try {
      const newOrder = new Order({user_details: req.body.user_details, cart: req.body.cart, userId: req.body.userId, type: req.body.type });
  
      const savedOrder = await newOrder.save();
      
      res.status(200).send(savedOrder);
    } catch (err) {
      next(err);
    }
  };



  export const getCountOrder = async (req, res, next) => {
    let data;
    try {
      const users = await Order.count();
      
    
     data = users
      res.status(200).json(data);
   
    } catch (err) {
      next(err);
    }
  };



  export const getAllOrders = async (req, res, next) => {
    let data;
    try {
      const products = await Order.find().sort({ "status": -1 });
      if (!products) return next(createError(404, "Products not found!"));
    
     data = products
      res.status(200).json(data);
   
    } catch (err) {
      next(err);
    }
  };


  export const getOrder = async (req, res, next) => {
    try {
      const product = await Order.findById(req.params.id)
      res.status(200).json(product.cart.products);
    } catch (err) {
      next(err);
    }
  };

  export const getMyOrders = async (req, res, next) => {
    try {
      const product = await Order.find({userId: req.params.id}).sort({ "status": -1 })
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  export const getFullOrder = async (req, res, next) => {
    try {
      const product = await Order.findById(req.params.id)
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  export const topOrders = async (req, res, next) => {
    try {
      const orders = await Order.find().sort( { "cart.total": -1 } ).limit(7)

      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  };
  

  export const deliverOrder = async (req, res, next) => {
    try {
      const product = await Order.findById(req.params.id);
      if (!product) return next(createError(404, "Order not found!"));
      
        const updatedProduct = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: {status: "Delivered", seen: true},
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
   
    } catch (err) {
      next(err);
    }
  };