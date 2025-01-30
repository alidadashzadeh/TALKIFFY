import { useState } from "react";
import { handleErrorToast } from "../utils/errorHandler";
import { useContactContext } from "../contexts/ContactContext.jsx";
import { useMessagesContext } from "../contexts/MessagesContext.jsx";
import { useSocketContext } from "../contexts/SocketContext.jsx";
import { axiosInstance } from "../utils/axios.js";

function useSendMessage() {
	const [loading, setLoading] = useState(false);
	const { currentContactId } = useContactContext();
	const { messages, setMessages } = useMessagesContext();
	const { socket, onlineUsers } = useSocketContext();
	const sendMessage = async ({ message: messageContent }) => {
		setLoading(true);

		try {
			const { data } = await axiosInstance.post(
				`/messages/${currentContactId}`,
				{ content: messageContent }
			);
			setMessages([...messages, data?.data.newMessage]);

			if (onlineUsers.includes(currentContactId)) {
				socket.emit("setMessage", data?.data?.newMessage);
			}
		} catch (error) {
			handleErrorToast(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, sendMessage };
}

export default useSendMessage;
