import { useState } from "react";
import { handleErrorToast } from "../utils/errorHandler";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useSocketContext } from "../contexts/SocketContext";
import { axiosInstance } from "../utils/axios";

function useAddNewContact() {
	const [loading, setLoading] = useState(false);
	const [isContactAdded, setIsContactAdded] = useState(false);
	const { currentUser, setCurrentUser } = useAuthContext();
	const { onlineUsers, socket } = useSocketContext();

	const addNewContact = async ({ email }) => {
		setLoading(true);

		try {
			if (currentUser.contacts.find((contact) => contact.email === email))
				throw new Error("The user already in your contact List");

			const { data } = await axiosInstance.get(`/users?email=${email}`);
			if (data.results === 0)
				throw new Error("there is no user with provided email");

			if (onlineUsers.includes(data.data.doc[0]._id)) {
				socket.emit("setContacts", data.data.doc[0]._id);
			}

			const contactId = data.data.doc[0]._id;
			await axiosInstance.patch(`/users/${currentUser._id}`, {
				contacts: [...currentUser.contacts, contactId],
			});
			await axiosInstance.patch(`/users/${contactId}`, {
				contacts: [...data.data.doc[0].contacts, currentUser._id],
			});

			const refreshedUser = await axiosInstance.get(
				`/users/${currentUser._id}`
			);

			toast.success("Contact added successfully");
			setIsContactAdded(true);
			setCurrentUser(refreshedUser.data.data.doc);
		} catch (error) {
			handleErrorToast(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, addNewContact, isContactAdded, setIsContactAdded };
}

export default useAddNewContact;
