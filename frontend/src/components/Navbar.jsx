import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
	const { logout, authUser } = useAuthStore();

	return (
		<header
			className="border-b dark-border fixed w-full top-0
  z-40 backdrop-blur-lg bg-base-100/80"
		>
			<div className="container mx-auto px-4 h-16">
				<div className="flex items-center justify-between h-full">
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="flex items-center gap-2.5 hover:opacity-80 transition-all"
						>
							<div className="size-9 rounded-lg bg-primary flex items-center justify-center">
								<img
									src="/icon.svg"
									className="w-5 h-5 text-base-content/60"
								/>
							</div>
							<h1 className="text-lg font-bold">Tachyon</h1>
						</Link>
					</div>

					<div className="flex items-center gap-2">
						{authUser && (
							<>
								<Link
									to={"/profile"}
									className={
										"btn btn-sm gap-2 bg-base-100 dark-border transition-colors hover:bg-base-200"
									}
								>
									<User className="size-5" />
									<span className="hidden sm:inline">
										Profile
									</span>
								</Link>

								<button
									className="flex gap-2 items-center hover:cursor-pointer"
									onClick={logout}
								>
									<LogOut className="size-5" />
									<span className="hidden sm:inline">
										Logout
									</span>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
