import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
	const { selectedUser } = useChatStore();

	return (
		<div className="h-screen bg-base-300">
			<div className="flex items-center justify-center pt-20 px-4">
				<div className="grid grid-cols-[max-content_1fr] gap-x-4 max-w-6xl flex-1">
					<div className="bg-base-100 rounded-lg w-full dark-border border h-[calc(100dvh-6rem)]">
						<div className="flex h-full rounded-lg overflow-hidden">
							<Sidebar />
						</div>
					</div>

					<div className="bg-base-100 rounded-lg w-full dark-border border h-[calc(100dvh-6rem)]">
						<div className="flex h-full rounded-lg overflow-hidden">
							{!selectedUser ? (
								<NoChatSelected />
							) : (
								<ChatContainer />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
