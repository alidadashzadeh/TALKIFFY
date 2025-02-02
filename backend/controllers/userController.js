import User from "../models/userModel.js";
import multer from "multer";
import sharp from "sharp";
import path from "path";

import { fileURLToPath } from "url";

import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
} from "./handleFactory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, path.join(__dirname, "../../frontend/public"));
// 	},
// 	filename: (req, file, cb) => {
// 		const ext = file.mimetype.split("/")[1];
// 		cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
// 	},
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new Error("not an Image, please upload only images!"), false);
	}
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhoto = upload.single("avatar");

export const resizeUserPhoto = (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

	sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(path.join(__dirname, `../avatars/${req.file.filename}`));

	next();
};

export const getAllUsers = getAll(User);
export const createUser = createOne(User);
export const getUser = getOne(User, {
	path: "contacts",
	select: "email username avatar",
});
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
