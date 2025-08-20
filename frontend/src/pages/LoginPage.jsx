import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { login, isLoggingIn } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		login(formData);
	};

	return (
		<div className="min-h-screen bg-base-300 pt-32 lg:pt-15">
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="flex flex-col items-center gap-2 group">
						<div
							className="size-12 rounded-lg bg-primary flex items-center justify-center
              group-hover:bg-base-content/20 transition-colors"
						>
							<img
								src="/icon.svg"
								className="size-6 text-base-content/60"
							/>
						</div>
						<h1 className="text-2xl font-bold mt-2">
							Welcome Back
						</h1>
						<p className="text-base-content/60">
							Sign in into your account
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">
									Email
								</span>
							</label>

							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="size-5 text-base-content/40 z-10" />
								</div>
								<input
									type="text"
									className={
										"input input-bordered w-full pl-10"
									}
									placeholder="you@example.com"
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">
									Password
								</span>
							</label>

							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="size-5 text-base-content/40 z-10" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									className={
										"input input-bordered w-full pl-10"
									}
									placeholder="******"
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
								/>

								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 hover:cursor-pointer"
									onClick={() => {
										setShowPassword(!showPassword);
									}}
								>
									{showPassword ? (
										<EyeOff className="size-5 text-base-content/40" />
									) : (
										<Eye className="size-5 text-base-content/40" />
									)}
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="btn btn-light w-full text-base-300 shadow-none"
							disabled={isLoggingIn}
						>
							{isLoggingIn ? (
								<>
									<Loader2 className="size-5 animate-spin" />
									Loading...
								</>
							) : (
								"Login"
							)}
						</button>
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Doesn't have an account?{" "}
							<Link
								to="/signup"
								className="link text-base-content no-underline"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
