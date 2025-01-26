import { useCallback, useState } from "react";
import { handleErrorToast } from "../utils/errorHandler";
import { useContactContext } from "../contexts/ContactContext.jsx";
import { useMessagesContext } from "../contexts/MessagesContext.jsx";
import { axiosInstance, getAuthToken } from "../utils/axios.js";

function useGetMessages() {
	const [loading, setLoading] = useState(false);
	const { currentContactId } = useContactContext();
	const { setMessages } = useMessagesContext();

	const getMessages = useCallback(async () => {
		setLoading(true);
		if (!currentContactId) return;
		const token = getAuthToken();

		try {
			const { data } = await axiosInstance.get(
				`/messages/getMessages/${currentContactId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
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
