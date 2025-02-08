import { useState } from "react";

import { handleErrorToast } from "../utils/errorHandler";
import { useAuthContext } from "./../contexts/AuthContext.jsx";

import { axiosInstance } from "../utils/axios.js";
import toast from "react-hot-toast";

function useLogin() {
	const [loading, setLoading] = useState(false);
	const { setCurrentUser } = useAuthContext();

	const login = async ({ email, password }) => {
		setLoading(true);

		try {
			const { data } = await axiosInstance.post("/users/login", {
				email,
				password,
			});

			if (data.status === "success") {
				toast.success("Logged in successfully.");
				setCurrentUser(data?.data.user);
			}
		} catch (error) {
			handleErrorToast(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
}

export default useLogin;
