import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";

import { useContactContext } from "../contexts/ContactContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useThemeContext } from "../contexts/ThemeContext";

import useAddNewContact from "../hooks/useAddNewContact";

function AddContactModal() {
	const { openAddContactModal, setOpenAddContactModal } = useContactContext();
	const { currentUser } = useAuthContext();
	const { loading, addNewContact, isContactAdded } = useAddNewContact();
	const { theme } = useThemeContext();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		if (isContactAdded) {
			reset();
			setOpenAddContactModal(false);
		}
	}, [isContactAdded, setOpenAddContactModal, reset]);

	const onSubmit = async (data) => {
		if (data.email === currentUser.email)
			return toast.error("Wrong User selected!");
		addNewContact(data);
	};

	return (
		<>
			<Modal
				open={openAddContactModal}
				onClose={() => {
					reset();
					setOpenAddContactModal(false);
				}}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 376,
						bgcolor: theme === "dark" ? "#3A3A3A" : "#f4f4f4",
						borderRadius: "10px",
						boxShadow: 24,
						pt: 2,
						px: 4,
						pb: 3,
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<Typography
						variant="h6"
						id="child-modal-title"
						sx={{
							color: theme === "dark" ? "#d5d5d5" : "#0f0f0f",
						}}
					>
						Add new Contact
					</Typography>

					<form
						style={{ display: "flex", flexDirection: "column", gap: "8px" }}
						onSubmit={handleSubmit(onSubmit)}
					>
						<TextField
							type="email"
							id="email"
							label="Email"
							variant="outlined"
							error={errors.email ? true : false}
							disabled={loading}
							helperText={errors?.email?.message}
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Please enter a valid email address",
								},
							})}
							slotProps={{
								inputLabel: {
									sx: {
										color: theme === "dark" ? "#d5d5d5" : "#0f0f0f",
									},
								},
								input: {
									sx: {
										color: theme === "dark" ? "#d5d5d5" : "#0f0f0f",
									},
								},
							}}
						/>
						<Box>
							<Button type="submit" variant="contained" disabled={loading}>
								{loading ? "Adding Contact..." : "Add contact"}
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</>
	);
}

export default AddContactModal;
