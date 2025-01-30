import toast from "react-hot-toast";
import { useAuthContext } from "./../contexts/AuthContext.jsx";
import { axiosInstance } from "../utils/axios.js";

function useUploadImage() {
	const { currentUser } = useAuthContext();
	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("avatar", file);
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
		}
	};

	return { handleImageUpload };
}

export default useUploadImage;
