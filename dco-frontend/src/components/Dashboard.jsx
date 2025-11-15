import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const email = localStorage.getItem("userEmail");

	useEffect(() => {
		const loadUser = async () => {
			try {
				const res = await fetch(`http://localhost:8080/auth/dashboard-by-email?email=${email}`);
				const data = await res.json();

				if (res.ok) setUser(data);
			} catch (e) {
				console.error(e);
			}
		};

		loadUser();
	}, [email]);

	const logout = () => {
		localStorage.clear();
		window.location.href = "/login";
	};

	if (!user) {
		return (
			<div className="min-h-screen flex justify-center items-center text-xl text-gray-600">
				Loading Dashboard...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 p-6">
			{/* Header */}
			<div className="flex justify-between items-center bg-white/80 px-6 py-4 rounded-xl shadow-md">
				<h1 className="text-2xl font-bold text-orange-700">🏦 DigiBank Dashboard</h1>

				<button
					onClick={logout}
					className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow"
				>
					Logout
				</button>
			</div>

			{/* Welcome Section */}
			<div className="text-center mt-10">
				<h2 className="text-3xl font-bold text-orange-700">
					Welcome, {user.firstName} {user.lastName} 👋
				</h2>
				<p className="text-gray-600 mt-2">Here is your onboarding & KYC progress.</p>
			</div>

			{/* Navigation Buttons */}
			<div className="mt-10 flex justify-center">
				<div className="bg-white/90 p-6 rounded-xl shadow-lg flex gap-6">

					<button
						onClick={() => navigate("/profile")}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all flex items-center gap-2"
					>
						👤 View Profile
					</button>

					<button
						onClick={() => navigate("/kyc")}
						className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-all flex items-center gap-2"
					>
						🔐 KYC Status
					</button>

					<button
						onClick={() => navigate("/upload-docs")}
						className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition-all flex items-center gap-2"
					>
						📁 Upload Documents
					</button>

				</div>
			</div>

			{/* Main Data Cards */}
			<div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">

				{/* Personal Details */}
				<div className="bg-white p-6 rounded-xl shadow-md border">
					<h3 className="text-xl font-semibold text-orange-700 mb-3">👤 Personal Details</h3>
					<p><b>Name:</b> {user.firstName} {user.lastName}</p>
					<p><b>Email:</b> {user.email}</p>
					<p><b>Phone:</b> {user.phone}</p>
					<p><b>PAN:</b> {user.pan}</p>
					<p><b>DOB:</b> {user.dob}</p>
				</div>

				{/* KYC Section */}
				<div className="bg-white p-6 rounded-xl shadow-md border">
					<h3 className="text-xl font-semibold text-orange-700 mb-3">🔒 KYC Verification</h3>

					<p>
						<b>Email Verified:</b>{" "}
						{user.emailVerified ? (
							<span className="text-green-600 font-bold">✔ Verified</span>
						) : (
							<span className="text-red-600 font-bold">✘ Not Verified</span>
						)}
					</p>

					<p className="mt-3 text-gray-600">
						Your identity verification helps to secure your banking access.
					</p>
				</div>

				{/* Document Upload Status */}
				<div className="bg-white p-6 rounded-xl shadow-md border">
					<h3 className="text-xl font-semibold text-orange-700 mb-3">📄 Document Upload</h3>

					<ul className="text-gray-700 space-y-2">
						<li>Aadhar: {user.aadharCardDocs ? "✔ Uploaded" : "✘ Pending"}</li>
						<li>PAN: {user.panCardDocs ? "✔ Uploaded" : "✘ Pending"}</li>
						<li>Address: {user.addressVerificationDocs ? "✔ Uploaded" : "✘ Pending"}</li>
						<li>Signature: {user.signatureDocs ? "✔ Uploaded" : "✘ Pending"}</li>
					</ul>
				</div>

			</div>
		</div>
	);
};

export default Dashboard;
