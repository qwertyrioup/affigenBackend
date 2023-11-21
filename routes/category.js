import express from "express";
import { getAll } from "../controllers/category.js";


const router = express.Router();

//create revenue Product
router.get("/getall",  getAll)






export default router;
