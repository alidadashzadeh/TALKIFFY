import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useThemeContext } from "../contexts/ThemeContext";

function SettingsPage() {
	const { theme, setTheme } = useThemeContext();
	const navigate = useNavigate();

	const handleChange = () => {
		setTheme((theme) => (theme === "dark" ? "light" : "dark"));
	};
	return (
		<div className="flex justify-center items-center h-full bg-background__primary ">
			<div className="flex flex-col gap-2 bg-background__secondary p-8 rounded-xl ">
				<p className="text-2xl p-2 font-bold text-text__primary border-b-2">
					SETTINGS
				</p>
				<div className="flex gap-4 items-center   ">
					<div className="text-text__primary font-bold">
						{theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode"}
					</div>
					<Switch checked={theme === "dark"} onChange={handleChange} />
				</div>
				<Button
					variant="outlined"
					className="text-text__primary"
					startIcon={<ArrowBackIcon />}
					onClick={() => {
						navigate("/");
					}}
				>
					Back
				</Button>
			</div>
		</div>
	);
}

export default SettingsPage;
