/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [contacts, setContacts] = useState(currentUser?.contacts || []);

	useEffect(() => {
		if (currentUser) setContacts(currentUser?.contacts);
	}, [currentUser]);

	return (
		<AuthContext.Provider
			value={{ currentUser, setCurrentUser, contacts, setContacts }}
		>
			{children}
		</AuthContext.Provider>
	);
};
