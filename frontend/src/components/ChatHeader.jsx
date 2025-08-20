import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
	const { selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers } = useAuthStore();

	return (
		<div className="p-2.5 border-b dark-border">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* Avatar */}
					<div className="avatar">
						<div className="size-10 rounded-full relative outline-[#9d9d9d] outline-2">
							<img
								src={selectedUser.profilepic || "/avatar.png"}
								alt={selectedUser.nickname}
							/>
						</div>
					</div>

					{/* User info */}
					<div>
						<h3 className="font-medium">{selectedUser.nickname}</h3>
						<p className="text-sm text-base-content/60">
							{onlineUsers.includes(selectedUser._id)
								? "Online"
								: "Offline"}
						</p>
					</div>
				</div>

				{/* Close button */}
				<button onClick={() => setSelectedUser(null)}>
					<X />
				</button>
			</div>
		</div>
	);
};
export default ChatHeader;
