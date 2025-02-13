import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { ContactContextProvider } from "./contexts/ContactContext.jsx";
import { MessagesContextProvider } from "./contexts/MessagesContext.jsx";
import { SettingContextProvider } from "./contexts/SettingContext.jsx";
import { SocketContextProvider } from "./contexts/SocketContext.jsx";

const themeFont = createTheme({
	typography: {
		fontFamily: '"inter", "Helvetica", "Arial", sans-serif',
	},
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<StyledEngineProvider injectFirst>
			<BrowserRouter>
				<ThemeProvider theme={themeFont}>
					<AuthContextProvider>
						<ContactContextProvider>
							<MessagesContextProvider>
								<SettingContextProvider>
									<SocketContextProvider>
										<App />
									</SocketContextProvider>
								</SettingContextProvider>
							</MessagesContextProvider>
						</ContactContextProvider>
					</AuthContextProvider>
				</ThemeProvider>
			</BrowserRouter>
		</StyledEngineProvider>

		<Toaster />
	</StrictMode>
);
