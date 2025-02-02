import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useSignup from "../hooks/useSignup.js";

function SignupPage() {
	const { signup } = useSignup();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const password = watch("password");

	const onSubmit = async (data) => {
		console.log(data);
		signup(data);
	};

	return (
		<div className="flex justify-center items-center w-full h-[100vh] bg-background__primary text-text__primary">
			<div className="flex flex-col gap-4 items-center justify-center  p-8 rounded-xl  bg-background__secondary w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%] max-w-[400px]">
				<div className="flex gap-4 justify-center items-center">
					<div className="w-20">
						<img src="logo-2.gif" />
					</div>
					<div className="text-4xl">TALKIFFY</div>
				</div>
				<h1 className="text-xl ">Create new account</h1>
				<form
					className="flex flex-col gap-4 w-full"
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						type="email"
						id="email"
						label="Email"
						variant="outlined"
						error={errors.email ? true : false}
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
								className: "text-text__accent",
							},
							input: {
								className: "text-text__primary",
							},
						}}
					/>
					<TextField
						type="text"
						id="username"
						label="Username"
						variant="outlined"
						error={errors.username ? true : false}
						helperText={errors?.username?.message}
						{...register("username", {
							required: "Username is required",
							maxLength: 20,
						})}
						slotProps={{
							inputLabel: {
								className: "text-text__accent",
							},
							input: {
								className: "text-text__primary",
							},
						}}
					/>
					<TextField
						type="password"
						id="password"
						label="Password"
						variant="outlined"
						error={errors.password ? true : false}
						helperText={errors?.password?.message}
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters long",
							},
						})}
						slotProps={{
							inputLabel: {
								className: "text-text__accent",
							},
							input: {
								className: "text-text__primary",
							},
						}}
					/>
					<TextField
						type="password"
						id="passwordConfirm"
						label="Confirm Password"
						variant="outlined"
						error={errors.passwordConfirm ? true : false}
						helperText={errors?.passwordConfirm?.message}
						{...register("passwordConfirm", {
							required: "Confirm password is required",
							validate: (value) =>
								value === password || "Passwords do not match",
						})}
						slotProps={{
							inputLabel: {
								className: "text-text__accent",
							},
							input: {
								className: "text-text__primary",
							},
						}}
					/>

					<Button type="submit" className="bg-sky-500" variant="contained">
						Sign up
					</Button>
				</form>
				<Link
					to="/login"
					className="text-sm hover:underline hover:text-blue-600"
				>
					Already have an account? Login
				</Link>
			</div>
		</div>
	);
}

export default SignupPage;
