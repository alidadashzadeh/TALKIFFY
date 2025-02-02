import mongoose from "mongoose";

const talkSchema = new mongoose.Schema({
	participants: {
		type: [mongoose.Schema.ObjectId],
		ref: "User",
		required: true,
	},
	messages: { type: [mongoose.Schema.ObjectId], ref: "Message" },
});

const Talk = mongoose.model("Talk", talkSchema);

export default Talk;
