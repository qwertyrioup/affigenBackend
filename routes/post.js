import express from "express";
import { create, deletepost, getAll } from "../controllers/post.js";


const router = express.Router();

//create revenue Product
router.post("/create",  create)


router.get("/getall", getAll)


//delete post

router.delete("/delete/:id", deletepost)






export default router;
