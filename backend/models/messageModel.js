import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: { type: mongoose.Schema.ObjectId, ref: "User" },
		receiverId: { type: mongoose.Schema.ObjectId, ref: "User" },
		content: { type: String, required: [true, "A message must have content!"] },
		isSent: { type: Boolean, default: true },
		isDelivered: { type: Boolean, default: false },
		isSeen: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
