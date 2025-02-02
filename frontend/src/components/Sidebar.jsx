import { useAuthContext } from "../contexts/AuthContext";
import { useContactContext } from "../contexts/ContactContext";

import ContactListItem from "./ContactListItem";
import SidebarSearchbar from "./SidebarSearchbar";
import SidebarFooter from "./SidebarFooter";

function Sidebar() {
	const { contacts } = useAuthContext();
	const { filteredBy } = useContactContext();

	const filteredContacts = !filteredBy
		? contacts
		: contacts.filter((contact) => contact.username.includes(filteredBy));

	return (
		<div className="flex flex-col justify-between h-full w-[60px] sm:w-[148px] md:w-[224px] lg:w-[25%] bg-background__primary">
			<SidebarSearchbar />
			<div className="flex flex-col justify-between flex-1 ">
				<div className=" overflow-y-auto">
					{filteredContacts.map((contact, i) => (
						<ContactListItem key={i} contact={contact} />
					))}
				</div>
				<SidebarFooter />
			</div>
		</div>
	);
}

export default Sidebar;
