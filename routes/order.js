import express from "express";
import { createOrder, deliverOrder, getAllOrders, getCountOrder, getFullOrder, getMyOrders, getOrder, topOrders } from "../controllers/order.js";

const router = express.Router();

//CREATE ORDER
router.post("/create", createOrder)

router.get("/get/count",  getCountOrder)
router.get("/",  getAllOrders)
router.get("/:id", getOrder)

router.get("/get/top", topOrders)
router.get("/my/:id", getMyOrders)
router.get("/get/:id", getFullOrder)

router.put("/deliver/:id", deliverOrder)


export default router;
