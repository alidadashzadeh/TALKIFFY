import express from "express";
import {
	getAllTalks,
	createTalk,
	getTalk,
	updateTalk,
	deleteTalk,
	getTalksByParticipants,
} from "../controllers/talkController.js";

const router = express.Router();

router.route("/byParticipants").get(getTalksByParticipants);
router.route("/").get(getAllTalks).post(createTalk);
router.route("/:id").get(getTalk).patch(updateTalk).delete(deleteTalk);

export default router;
