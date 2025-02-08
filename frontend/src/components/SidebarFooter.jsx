import { useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuthContext } from "../contexts/AuthContext";

import useLogout from "../hooks/useLogout";

function SidebarFooter() {
	const { currentUser } = useAuthContext();
	const { logout } = useLogout();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-4 items-center justify-between bg-brand text-text__secondary p-2 sm:flex-row">
			<div
				className="flex gap-2 items-center justify-center cursor-pointer"
				onClick={() => {
					navigate("/profile");
				}}
			>
				{currentUser.avatar ? (
					<Avatar
						alt={currentUser?.username}
						src={
							import.meta.env.MODE === "development"
								? `http://localhost:5001/avatars/${currentUser.avatar}`
								: `https://talkiffy.onrender.com/avatars/${currentUser.avatar}`
						}
					/>
				) : (
					<AccountCircleIcon fontSize="large" />
				)}
				<div className="hidden md:flex">
					<p className="font-bold  lg:hidden">
						{currentUser.username.length < 6
							? currentUser.username
							: currentUser.username.slice(0, 6) + "..."}
					</p>
					<p className="font-bold hidden lg:block">{currentUser.username}</p>
				</div>
			</div>
			<div className="gap-2 flex flex-col sm:flex-row">
				<button>
					<SettingsIcon
						fontSize="medium"
						className="text-text__secondary"
						onClick={() => {
							navigate("/settings");
						}}
					/>
				</button>
				<button>
					<LogoutIcon
						fontSize="medium"
						className="text-text__secondary"
						onClick={logout}
					/>
				</button>
			</div>
		</div>
	);
}

export default SidebarFooter;
