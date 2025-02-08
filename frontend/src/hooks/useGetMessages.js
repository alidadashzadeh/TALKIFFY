import { useCallback, useState } from "react";

import { useContactContext } from "../contexts/ContactContext.jsx";
import { useMessagesContext } from "../contexts/MessagesContext.jsx";

import { handleErrorToast } from "../utils/errorHandler";
import { axiosInstance } from "../utils/axios.js";

function useGetMessages() {
	const [loading, setLoading] = useState(false);
	const { currentContactId } = useContactContext();
	const { setMessages } = useMessagesContext();

	const getMessages = useCallback(async () => {
		setLoading(true);
		if (!currentContactId) return;

		try {
			const { data } = await axiosInstance.get(
				`/messages/getMessages/${currentContactId}`
			);
			setMessages(data.data.messages);
		} catch (error) {
			handleErrorToast(error);
		} finally {
			setLoading(false);
		}
	}, [currentContactId, setLoading, setMessages]);

	return { loading, getMessages };
}

export default useGetMessages;
