import { useEffect } from "react";

import { handleErrorToast } from "../utils/errorHandler";
import { useAuthContext } from "../contexts/AuthContext";
import { axiosInstance } from "../utils/axios";

function useSetDeliverOnLogin() {
	const { currentUser } = useAuthContext();

	useEffect(() => {
		if (!currentUser) return;
		const deliverOnLogin = async () => {
			try {
				await axiosInstance.patch("/messages/update-delivered", {
					receiverId: currentUser._id,
				});
			} catch (error) {
				handleErrorToast(error);
			}
		};

		deliverOnLogin();
	}, [currentUser]);
}

export default useSetDeliverOnLogin;
