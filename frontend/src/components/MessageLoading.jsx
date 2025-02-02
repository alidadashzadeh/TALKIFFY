import { CircularProgress } from "@mui/material";

function MessageLoading() {
	return (
		<div className=" h-screen w-screen bg-background__primary flex justify-center items-center">
			<CircularProgress />
		</div>
	);
}

export default MessageLoading;
