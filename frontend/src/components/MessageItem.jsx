/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import { useAuthContext } from "../contexts/AuthContext";
import { useContactContext } from "../contexts/ContactContext";

function MessageItem({ message }) {
	const { currentUser } = useAuthContext();
	const { currentContactId } = useContactContext();
	const currentContact = currentUser.contacts.find(
		(contact) => contact._id === currentContactId
	);

	return (
		<div
			className={`flex items-start gap-1 py-1  ${
				message.senderId === currentUser?._id ? "" : "flex-row-reverse"
			}`}
		>
			{currentUser.avatar ? (
				<Avatar
					className="h-8 w-8"
					alt={
						message.senderId === currentUser?._id
							? currentUser?.username
							: currentContact?.username
					}
					src={
						message.senderId === currentUser?._id
							? import.meta.env.MODE === "development"
								? `http://localhost:5001/avatars/${currentUser.avatar}`
								: `https://talkiffy.onrender.com/avatars/${currentUser.avatar}`
							: import.meta.env.MODE === "development"
							? `http://localhost:5001/avatars/${currentContact.avatar}`
							: `https://talkiffy.onrender.com/avatars/${currentContact.avatar}`
					}
				/>
			) : (
				<AccountCircleIcon fontSize="medium" />
			)}

			<div
				className={`flex flex-col  max-w-[75%] lg:max-w-[60%] ${
					message.senderId === currentUser._id ? "items-start" : "items-end"
				}`}
			>
				<div
					className={`rounded-lg p-2 flex gap-2 items-center ${
						message.senderId === currentUser._id
							? "bg-brand text-text__secondary rounded-tl-none text-text"
							: "bg-select  text-text__primary rounded-tr-none flex-row-reverse"
					}`}
				>
					{message?.content}
					{message.senderId === currentUser._id &&
						(message?.isDelivered ? (
							<DoneAllIcon
								className={`text-sm ${message?.isSeen && "text-green-500"}`}
							/>
						) : (
							<CheckIcon className="text-sm" />
						))}
				</div>
				<p className="text-[12px] text-text__accent">
					{new Date(message.createdAt).toLocaleTimeString("en-us", {
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
					})}
				</p>
			</div>
		</div>
	);
}

export default MessageItem;
