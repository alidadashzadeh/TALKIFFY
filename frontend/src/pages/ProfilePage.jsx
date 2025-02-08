import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useAuthContext } from "../contexts/AuthContext";
import useUploadImage from "../hooks/useUploadImage";

function ProfilePage() {
	const { currentUser } = useAuthContext();
	const { loading, handleImageUpload } = useUploadImage();
	const navigate = useNavigate();

	return (
		<div className=" h-screen w-screen flex justify-center items-center bg-background__primary text-text__primary">
			<div className="flex flex-col items-center relative  py-4 px-6 rounded-2xl w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] max-w-[500px] bg-background__secondary">
				<Button
					variant="outlined"
					className="absolute top-4 left-4 text-text__primary"
					startIcon={<ArrowBackIcon />}
					onClick={() => {
						navigate("/");
					}}
				>
					Back
				</Button>
				<p className="text-xl">Profile</p>
				<p>Your information</p>
				<div className="flex items-center gap-4 p-6 relative">
					<img
						className="size-32 rounded-full object-cover border-4"
						alt="profile"
						src={
							import.meta.env.MODE === "development"
								? `http://localhost:5001/avatars/${currentUser.avatar}`
								: `https://talkiffy.onrender.com/avatars/${currentUser.avatar}`
						}
					/>

					<Button
						className="absolute left-28 bottom-8  rounded-full"
						variant="standard"
						component="label"
						startIcon={<CameraAltIcon />}
						disabled={loading}
					>
						<input
							type="file"
							hidden
							accept="image/*"
							onChange={handleImageUpload}
						/>
					</Button>
				</div>
				<div className="py-4 mx-6 w-full">
					<p className="flex gap-1">
						<PersonOutlineIcon />
						User Name
					</p>
					<input
						className="w-full outline-none bg-background__secondary border-b-2 border-border opacity-50"
						value={currentUser.username}
						disabled
					/>
				</div>
				<div className="py-4 mx-6 w-full ">
					<p className="flex gap-1">
						<MailOutlineIcon />
						Email
					</p>
					<input
						className="w-full outline-none bg-background__secondary border-b-2 border-border opacity-50"
						value={currentUser.email}
						disabled
					/>
				</div>
				<div className="w-full p-4 rounded-md">
					<p className="text-xl"> Account Information</p>
					<div className="flex justify-between border-b-2 border-border p-1">
						<p>Memeber Since</p>
						<p>{new Date(currentUser.createdAt).toLocaleDateString("en-GB")}</p>
					</div>
					<div className="flex justify-between p-1">
						<p>Account Status</p>
						<p className="text-green-500">Active</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
