import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:8080/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials),
			});

			const data = await res.json();

			console.log("🔍 Login Response:", data);

			// Successful login?
			if (res.ok && data.token) {
				// Save details
				localStorage.setItem("authToken", data.token);
				localStorage.setItem("userId", data.userId);
				localStorage.setItem("userEmail", data.email);
				localStorage.setItem("userName", `${data.firstName} ${data.lastName}`);

				alert("✅ Login successful!");
				navigate("/dashboard");
			} else {
				alert(data.message || "❌ Invalid email or password!");
				localStorage.clear();
			}
		} catch (error) {
			console.error("⚠️ Login Error:", error);
			alert("⚠️ Server error while logging in!");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 flex flex-col">
			<header className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 shadow-md text-center">
				<h1 className="text-3xl font-bold text-white">🏦 DigiBank Login</h1>
			</header>

			<main className="flex-grow flex items-center justify-center">
				<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
					<h2 className="text-xl font-semibold text-orange-600 text-center mb-4">
						Login to Your Account
					</h2>

					<form onSubmit={handleLogin} className="space-y-4">
						<input
							type="email"
							name="email"
							placeholder="Enter Email"
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
							required
						/>

						<input
							type="password"
							name="password"
							placeholder="Enter Password"
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
							required
						/>

						<button
							type="submit"
							className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
						>
							Login Now
						</button>
					</form>

					<p className="text-center text-sm text-gray-500 mt-4">
						Don’t have an account?{" "}
						<a href="/" className="text-orange-600 hover:underline">
							Register here
						</a>
					</p>
				</div>
			</main>

			<footer className="text-center text-gray-500 text-sm py-4 border-t border-orange-200">
				© {new Date().getFullYear()} DigiBank. All Rights Reserved.
			</footer>
		</div>
	);
};

export default LoginForm;
