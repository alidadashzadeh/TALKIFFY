import { useEffect } from "react";

import { useSocketContext } from "../contexts/SocketContext";
import { useMessagesContext } from "../contexts/MessagesContext";
import { useContactContext } from "../contexts/ContactContext";

import { axiosInstance } from "../utils/axios";

function useListenMessages() {
	const { socket } = useSocketContext();
	const { messages, setMessages, unseenMessages, setUnseenMessages } =
		useMessagesContext();
	const { currentContactId } = useContactContext();

	useEffect(() => {
		socket?.on("getMessage", async (newMessage) => {
			if (messages?.some((message) => message._id === newMessage._id)) return;

			if (newMessage?.senderId === currentContactId) {
				setMessages([...messages, newMessage]);
				socket.emit("setSeen", newMessage);

				await axiosInstance.patch(`/messages/${newMessage._id}`, {
					isSeen: true,
				});
			} else {
				setUnseenMessages([...unseenMessages, newMessage]);
			}
			socket.emit("setDelivered", newMessage);
		});

		return () => socket?.off("getMessage");
	}, [
		socket,
		setMessages,
		messages,
		currentContactId,
		setUnseenMessages,
		unseenMessages,
	]);
}

export default useListenMessages;
