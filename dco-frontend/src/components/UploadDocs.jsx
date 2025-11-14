import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadDocs = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    aadhar: null,
    pancard: null,
    address: null,
    signature: null,
  });
  const [userId, setUserId] = useState("");

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("⚠️ Please enter your User ID first.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("aadhar", files.aadhar);
    formData.append("pancard", files.pancard);
    formData.append("address", files.address);
    formData.append("signature", files.signature);

    try {
      const response = await axios.post("http://localhost:8080/auth/upload-docs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("✅ Documents uploaded successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to upload documents. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-200">
      <div className="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          📁 Upload Your Documents
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Please upload all required KYC documents to complete your onboarding.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card</label>
              <input type="file" name="aadhar" onChange={handleFileChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card</label>
              <input type="file" name="pancard" onChange={handleFileChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Proof</label>
              <input type="file" name="address" onChange={handleFileChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Signature</label>
              <input type="file" name="signature" onChange={handleFileChange} required />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
          >
            Upload Documents
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocs;
