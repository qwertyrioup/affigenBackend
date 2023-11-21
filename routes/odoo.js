import express from "express";
import {  addOdoo, autoCompleteSearch, deleteManyOdoo, deleteOdoo, getAllOdoos, getCatCount, getCountOdoo, getOdoo, getSimilars, getSomeOdoos, search, updateManyOdoo, updateOdoo } from "../controllers/odoo.js";


const router = express.Router();

//create Odoo Product
router.post("/add",  addOdoo)

// get odoo

router.get("/:id", getOdoo)

// update Odoo Product
router.put("/:id",  updateOdoo)


router.put("/updatemany/:id",  updateManyOdoo)

// delete Odoo Product
router.delete("/:id",  deleteOdoo)
router.delete("/deletemany/:id",  deleteManyOdoo)

router.get("/", getAllOdoos)
router.get("/get/count", getCountOdoo)
// get cat count
router.get("/get/cat/count/:id", getCatCount)
//get some
router.get("/get/some", getSomeOdoos)


//get by category

router.get("/get/:id", search)

router.get("/similars/:id", getSimilars)


//search 
router.get("/search/:param", autoCompleteSearch)
// router.get("/tablesearch/:param", tablesearch)
// router.get("/tablesearch/count/:param", tablesearchCount)

export default router;
