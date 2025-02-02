import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: [
			process.env.NODE_ENV === "production"
				? "https://talkiffy-frontend.onrender.com"
				: "http://localhost:5173",
		],
		credentials: true,
	},
});

export const getReceiverSocketId = (receiverId) => {
	return usersSocketMap[receiverId];
};

const usersSocketMap = {};

io.on("connection", (socket) => {
	// console.log("a new user connected", socket.id);
	let currentUser;
	let userId;

	socket.on("setOnlineUsers", (user) => {
		userId = user._id;
		currentUser = user;
		usersSocketMap[userId] = socket.id;

		io.emit("getOnlineUsers", Object.keys(usersSocketMap));
	});

	socket.on("setContacts", (contactId) => {
		io.to(usersSocketMap[contactId]).emit("getContacts", currentUser);
	});

	socket.on("setMessage", (message) => {
		io.to(usersSocketMap[message?.receiverId]).emit("getMessage", message);
	});

	socket.on("setDelivered", (message) => {
		io.to(usersSocketMap[message?.senderId]).emit("getDelivered", message);
	});

	socket.on("setSeen", (message) => {
		io.to(usersSocketMap[message?.senderId]).emit("getSeen", message);
	});

	socket.on("disconnect", () => {
		// console.log("user disconnected", socket.id);
		if (userId) {
			delete usersSocketMap[userId];
			io.emit("getOnlineUsers", Object.keys(usersSocketMap));
		}
	});
});

export { app, server, io };
