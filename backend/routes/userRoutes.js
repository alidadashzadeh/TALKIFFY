import express from "express";

import {
	checkAuth,
	login,
	logout,
	protect,
	signup,
} from "../controllers/authController.js";
import {
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
	uploadUserPhoto,
	resizeUserPhoto,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/check", protect, checkAuth);

router.route("/").get(getAllUsers).post(createUser);
router
	.route("/:id")
	.get(getUser)
	.patch(protect, uploadUserPhoto, resizeUserPhoto, updateUser)
	.delete(deleteUser);

export default router;
