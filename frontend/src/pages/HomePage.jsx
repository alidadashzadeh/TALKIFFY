import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

function HomePage() {
	return (
		<div className="flex h-full">
			<Sidebar />
			<MainContent />
		</div>
	);
}

export default HomePage;
