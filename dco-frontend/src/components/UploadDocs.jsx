import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadDocs = () => {
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");

	const [files, setFiles] = useState({
		aadhar: null,
		pancard: null,
		address: null,
		signature: null,
	});

	const handleChange = (e) => {
		setFiles({ ...files, [e.target.name]: e.target.files[0] });
	};

	const handleUpload = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("userId", userId);
		formData.append("aadhar", files.aadhar);
		formData.append("pancard", files.pancard);
		formData.append("address", files.address);
		formData.append("signature", files.signature);

		const res = await fetch("http://localhost:8080/auth/upload-docs", {
			method: "POST",
			body: formData,
		});

		const text = await res.text();
		alert(text);

		if (res.ok) navigate("/dashboard");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">

			{/* Header */}
			<div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow-md">
				<h1 className="text-2xl font-bold text-purple-700">📁 Upload Documents</h1>
				<button
					onClick={() => navigate("/dashboard")}
					className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
				>
					← Back to Dashboard
				</button>
			</div>

			{/* Upload Form */}
			<form
				className="max-w-xl mx-auto bg-white mt-10 p-8 rounded-xl shadow-lg border"
				onSubmit={handleUpload}
			>
				<h2 className="text-xl font-semibold text-purple-700 mb-4">
					Upload Required KYC Documents
				</h2>

				<div className="space-y-5">

					<div>
						<label>Aadhar Card:</label>
						<input type="file" name="aadhar" onChange={handleChange} className="mt-2" required />
					</div>

					<div>
						<label>PAN Card:</label>
						<input type="file" name="pancard" onChange={handleChange} className="mt-2" required />
					</div>

					<div>
						<label>Address Proof:</label>
						<input type="file" name="address" onChange={handleChange} className="mt-2" required />
					</div>

					<div>
						<label>Signature:</label>
						<input type="file" name="signature" onChange={handleChange} className="mt-2" required />
					</div>

				</div>

				<button
					type="submit"
					className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
				>
					Upload Documents
				</button>
			</form>
		</div>
	);
};

export default UploadDocs;
