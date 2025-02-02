import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { useMessagesContext } from "../contexts/MessagesContext";

function useGetDeliverOnLogin() {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useMessagesContext();

	useEffect(() => {
		socket?.on("getDeliveredOnLogin", (theMessage) => {
			setMessages((messages) =>
				messages?.map((message) =>
					message._id === theMessage._id
						? { ...message, isDelivered: true }
						: message
				)
			);
		});
	}, [socket, messages, setMessages]);
}

export default useGetDeliverOnLogin;
