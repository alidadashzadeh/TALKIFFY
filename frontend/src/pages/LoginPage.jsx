import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useLogin from "./../hooks/useLogin.js";

function Login() {
	const { loading, login } = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		login(data);
	};

	return (
		<div className="flex justify-center items-center h-full bg-background__primary text-text__primary">
			<div className="flex flex-col gap-4 items-center justify-center p-8 rounded-xl bg-background__secondary w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%] max-w-[400px]">
				<div className="flex gap-2 justify-center items-center">
					<div className="w-20">
						<img src="logo-2.gif" />
					</div>
					<p className="text-4xl">TALKIFFY</p>
				</div>
				<p className="text-xl ">Login to your account</p>
				<form
					className="flex flex-col gap-4 w-full"
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						error={errors.email ? true : false}
						type="email"
						id="email"
						label="Email"
						variant="outlined"
						className="text-red-600"
						disabled={loading}
						helperText={errors?.email?.message}
						{...register("email", {
							required: "Email is required",
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
						disabled={loading}
						{...register("password", {
							required: "Password is required",
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

					<a href="#" className="text-sm hover:underline hover:text-blue-600">
						Forgot password?
					</a>
					<Button
						type="submit"
						className="bg-sky-500"
						variant="contained"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</Button>
				</form>
				<Link
					to="/signup"
					className="text-sm hover:underline hover:text-blue-600"
				>
					Don't have an account? signup
				</Link>
			</div>
		</div>
	);
}

export default Login;
