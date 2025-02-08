import toast from "react-hot-toast";
import { useAuthContext } from "./../contexts/AuthContext.jsx";
import { axiosInstance } from "../utils/axios.js";
import { useState } from "react";

function useUploadImage() {
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuthContext();
	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("avatar", file);
		setLoading(true);
		try {
			const { data } = await axiosInstance.patch(
				`/users/${currentUser._id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (data.status === "success")
				toast.success("Avatar updated successfully!");
			window.location.reload();
		} catch (error) {
			toast.error("something went wrong uploading image, try again!");
		} finally {
			setLoading(false);
		}
	};

	return { loading, handleImageUpload };
}

export default useUploadImage;
