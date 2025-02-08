import { Avatar } from "@mui/material";

import { useAuthContext } from "../contexts/AuthContext";
import { useContactContext } from "../contexts/ContactContext";

function MessageHeader() {
	const { currentContactId } = useContactContext();
	const { currentUser } = useAuthContext();

	let currentContact;

	currentUser.contacts.map((contact) => {
		if (contact._id === currentContactId) currentContact = contact;
	});

	return (
		<div className=" flex gap-4 items-center justify-start w-full p-2 bg-brand ">
			<Avatar
				alt={currentContact?.username}
				src={
					import.meta.env.MODE === "development"
						? `http://localhost:5001/avatars/${currentContact.avatar}`
						: `https://talkiffy.onrender.com/avatars/${currentContact.avatar}`
				}
			/>
			<p className="font-bold text-text__secondary">
				{currentContact?.username}
			</p>
		</div>
	);
}

export default MessageHeader;
