import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { LuSend } from "react-icons/lu";

import useSendMessage from "../hooks/useSendMessage";

// eslint-disable-next-line react/prop-types
function MessageBar({ loading }) {
	const { register, handleSubmit, reset } = useForm();
	const { sendMessage } = useSendMessage();

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onSubmit = (data) => {
		sendMessage(data);
		reset();
	};

	return (
		<div className="flex gap-2 px-4 my-2 ">
			<form
				className="flex gap-2 w-full items-center  "
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					className="w-full text-text__primary bg-background__secondary outline-none border-2 border-brand rounded-full pl-4 h-12"
					ref={inputRef}
					autoComplete="off"
					disabled={loading}
					placeholder="Send a Message ..."
					{...register("message", {
						required: "A message cannot be empty",
					})}
				/>
				<button type="submit">
					<LuSend className="text-3xl text-text__primary " disabled={loading} />
				</button>
			</form>
		</div>
	);
}

export default MessageBar;
