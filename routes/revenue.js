import express from "express";
import { addRevenue, getAll, range } from "../controllers/revenue.js";


const router = express.Router();

//create revenue Product
router.post("/add",  addRevenue)
router.get("/",  getAll)

router.get("/get/lastweek", range)





export default router;
