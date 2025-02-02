import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { useContactContext } from "../contexts/ContactContext";

import AddContactModal from "./AddContactModal";

function SidebarSearchbar() {
	const { setOpenAddContactModal, setFilteredBy } = useContactContext();

	const handleChange = (e) => {
		setFilteredBy(e.target.value);
	};

	return (
		<div className="flex p-2 items-center justify-center sm:justify-between gap-2 sm:gap-4 lg:gap-8">
			<form className="hidden sm:block">
				<div className=" gap-1 hidden sm:flex">
					<SearchIcon className="text-text__primary text-3xl hidden xl:block" />
					<input
						onChange={handleChange}
						placeholder="Contacts"
						className="bg-background__primary outline-none border-b-[1px] hidden sm:block sm:w-[72px] md:w-[120px] lg:w-[176px] border-text__primary text-text__primary "
					/>
				</div>
			</form>

			<AddIcon
				className="text-text__primary text-3xl cursor-pointer border-[2px] rounded-full hover:bg-hover "
				onClick={() => setOpenAddContactModal(true)}
			/>

			<AddContactModal />
		</div>
	);
}

export default SidebarSearchbar;
