import { Router } from "express";
import { loginUser,logoutUser, registerUser, searchUser, updateUserDetails, userDetails } from "../controllers/user.controller.js";
import upload from "../midlewares/multer.middleware.js";
import { isLoggedIn } from "../midlewares/auth.middleware.js";



const router = Router();

router.post("/register",upload.single("profile_pic"),registerUser);
router.post("/login",loginUser);
router.get("/userdetails",isLoggedIn,userDetails);
router.post("/logout",logoutUser);
router.post("/update-user",isLoggedIn,updateUserDetails);
router.post("/search-user",searchUser);

export default router;