import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { useSettingContext } from "../contexts/SettingContext";

function SettingsPage() {
	const { theme, setTheme, sounds, notifSound, setNotifSound } =
		useSettingContext();
	const navigate = useNavigate();

	const handleChange = () => {
		setTheme((theme) => (theme === "dark" ? "light" : "dark"));
	};

	const handleSoundChange = (event) => {
		setNotifSound(event.target.value);
		localStorage.setItem("notificationSound", event.target.value);
	};

	const previewSound = (soundRef) => {
		new Audio(sounds[soundRef]).play();
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

				<div className="flex flex-col gap-2">
					<p className="text-2xl p-2 font-bold text-text__primary border-b-2">
						Select Notification Sound
					</p>

					<label className="flex gap-2 text-text__primary">
						<input
							type="radio"
							value="notif1"
							checked={notifSound === "notif1"}
							onChange={handleSoundChange}
						/>
						Notification 1
						<button onClick={() => previewSound("notif1")}>
							{<PlayCircleIcon />}
						</button>
					</label>
					<label className="flex gap-2 text-text__primary">
						<input
							type="radio"
							value="notif2"
							checked={notifSound === "notif2"}
							onChange={handleSoundChange}
						/>
						Notification 2
						<button onClick={() => previewSound("notif2")}>
							{<PlayCircleIcon />}
						</button>
					</label>
					<label className="flex gap-2 text-text__primary">
						<input
							type="radio"
							value="notif3"
							checked={notifSound === "notif3"}
							onChange={handleSoundChange}
						/>
						Notification 3
						<button onClick={() => previewSound("notif3")}>
							{<PlayCircleIcon />}
						</button>
					</label>
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
