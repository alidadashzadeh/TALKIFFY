import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { server, app } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "https://talkiffy-frontend.onrender.com"
				: "http://localhost:5173",
		credentials: true,
	})
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

app.use("/public", express.static(path.join(__dirname, "../frontend/public")));

mongoose
	.connect(process.env.MONGODB_URI, {})
	.then(() => console.log("DB connection successful!"))
	.catch((err) => console.error("DB connection error:", err));

const port = process.env.PORT || 5001;
server.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
