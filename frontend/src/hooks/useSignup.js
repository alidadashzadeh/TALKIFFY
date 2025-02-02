import { useState } from "react";
import toast from "react-hot-toast";

import { handleErrorToast } from "../utils/errorHandler.js";
import { useAuthContext } from "./../contexts/AuthContext";
import { axiosInstance } from "../utils/axios.js";

function useSignup() {
	const [loading, setLoading] = useState(false);
	const { setCurrentUser } = useAuthContext();

	const signup = async ({ email, username, password, passwordConfirm }) => {
		setLoading(true);
		try {
			const { data } = await axiosInstance.post("/users/signup", {
				email,
				username,
				password,
				passwordConfirm,
			});

			if (data.status === "success") {
				toast.success("user created successfully.");
				setCurrentUser(data?.data.user);
			}
		} catch (error) {
			handleErrorToast(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
}

export default useSignup;
