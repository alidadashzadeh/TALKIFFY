import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://talkiffy.onrender.com/api/v1",
	// baseURL: "http://localhost:5001/api/v1",
	withCredentials: true,
});
