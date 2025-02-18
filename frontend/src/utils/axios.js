import axios from "axios";

export const axiosInstance = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
			? "http://localhost:5001/api/v1"
			: "https://talkiffy.onrender.com/api/v1",
	withCredentials: true,
});
