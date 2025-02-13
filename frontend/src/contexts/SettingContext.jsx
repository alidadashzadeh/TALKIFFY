/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// contexts/useSettingContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

import notifSound1 from "./../sounds/notifSound1.mp3";
import notifSound2 from "./../sounds/notifSound2.mp3";
import notifSound3 from "./../sounds/notifSound3.mp3";

const SettingContext = createContext();

export const useSettingContext = () => useContext(SettingContext);

export const SettingContextProvider = ({ children }) => {
	const sounds = {
		notif1: notifSound1,
		notif2: notifSound2,
		notif3: notifSound3,
	};

	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	const [notifSound, setNotifSound] = useState(() => {
		return localStorage.getItem("notificationSound") || "notif1";
	});

	if (!theme) document.documentElement.classList.add("light");

	useEffect(() => {
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<SettingContext.Provider
			value={{
				theme,
				setTheme,
				notifSound,
				setNotifSound,
				sounds,
			}}
		>
			{children}
		</SettingContext.Provider>
	);
};
