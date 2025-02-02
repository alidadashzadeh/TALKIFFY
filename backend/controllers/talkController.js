import mongoose from "mongoose";
import Talk from "../models/talkModel.js";
import { createOne, deleteOne, getAll, updateOne } from "./handleFactory.js";

export const getAllTalks = getAll(Talk);
export const createTalk = createOne(Talk);
export const deleteTalk = deleteOne(Talk);
export const updateTalk = updateOne(Talk);

export const getTalksByParticipants = async (req, res) => {
	try {
		const participants = req.query.participants.split(",");

		const doc = await Talk.find({
			participants: { $all: [participants[0], participants[1]] },
		});
		res.status(200).json({
			status: "success",
			results: doc.length,
			data: {
				doc,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "fail", message: error.message });
	}
};

export const getTalk = async (req, res) => {
	try {
		let query = Talk.findById(req.params.id)
			.populate({
				path: "participants",
			})
			.populate({ path: "messages" });

		const doc = await query;

		if (!doc) throw new Error("There is no data with provided ID ");

		res.status(200).json({
			status: "success",
			data: { doc },
		});
	} catch (error) {
		res.status(400).json({ status: "fail", message: error.message });
	}
};
