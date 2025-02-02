/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const MessagesContext = createContext();

export const useMessagesContext = () => {
	return useContext(MessagesContext);
};

export const MessagesContextProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);
	const [unseenMessages, setUnseenMessages] = useState([]);

	return (
		<MessagesContext.Provider
			value={{
				messages,
				setMessages,
				unseenMessages,
				setUnseenMessages,
			}}
		>
			{children}
		</MessagesContext.Provider>
	);
};
