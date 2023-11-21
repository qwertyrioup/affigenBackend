import Contact from "../models/Contact.js";

// create contact message
export const create = async (req, res, next) => {
    try {
      
      const newContact = new Contact({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, message: req.body.message});
  
      const savedContact = await newContact.save();
   
      res.status(200).send(savedContact);
    } catch (err) {
      next(err);
    }
  };


  export const getall = async (req, res, next) => {
    try {
      
  
      const contacts = await Contact.find().sort({createdAt: -1});
   
      res.status(200).send(contacts);
    } catch (err) {
      next(err);
    }
  };