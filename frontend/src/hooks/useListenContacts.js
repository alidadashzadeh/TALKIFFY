import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useSocketContext } from "../contexts/SocketContext";

function useListenContacts() {
	const { socket } = useSocketContext();
	const { contacts, setContacts } = useAuthContext();

	useEffect(() => {
		socket?.on("getContacts", (newContact) => {
			if (contacts.some((contact) => contact._id === newContact._id)) return;
			const newContacts = [
				...contacts,
				{
					avatar: newContact.avatar,
					username: newContact.username,
					email: newContact.email,
					_id: newContact._id,
				},
			];
			setContacts(newContacts);
		});

		return () => socket?.off("getContacts");
	}, [socket, contacts, setContacts]);
}

export default useListenContacts;
