import express from "express";
import { deleteUser, findAll, getUserCount, signin, signup, updateUser } from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

router.get("/count", getUserCount)

//delete user
router.delete("/:id", deleteUser)
 // update user 
 router.put("/update/:id", updateUser)

// get all

router.get("/findall", findAll)


export default router;
