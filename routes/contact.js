import express from "express";
import { create, getall } from "../controllers/contact.js";

const router = express.Router();

//CREATE A contact message
router.post("/create", create)
router.get("/get", getall)




export default router;
