import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/auth/dashboard-by-email?email=${email}`
        );
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 font-[Inter]">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white shadow-xl rounded-xl px-8 py-4 border border-yellow-200">
        <h1 className="text-3xl font-bold text-yellow-700 flex items-center gap-2">
          🏦 KDI Digital Bank
        </h1>
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>

      {/* GREETING */}
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold text-yellow-700 drop-shadow-sm">
          Welcome, {user.firstName} {user.lastName} 👋
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Your premium digital banking overview
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-5 mt-10">

        <button
          onClick={() => navigate("/profile")}
          className="dash-btn bg-yellow-600 hover:bg-yellow-700"
        >
          👤 Profile
        </button>

        <button
          onClick={() => navigate("/kyc")}
          className="dash-btn bg-green-600 hover:bg-green-700"
        >
          🔐 KYC Status
        </button>

        <button
          onClick={() => navigate("/upload-docs")}
          className="dash-btn bg-purple-600 hover:bg-purple-700"
        >
          📁 Upload Documents
        </button>

        <button
          onClick={() => navigate("/transaction")}
          className="dash-btn bg-orange-600 hover:bg-orange-700"
        >
          💰 Make Transaction
        </button>

        <button
          onClick={() => navigate("/transaction-history")}
          className="dash-btn bg-teal-600 hover:bg-teal-700"
        >
          📄 Transaction History
        </button>

      </div>

      {/* CARD GRID */}
      <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">

        {/* PERSONAL DETAILS */}
        <div className="dash-card">
          <h3 className="dash-title">👤 Personal Details</h3>
          <p><b>Name:</b> {user.firstName} {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>PAN:</b> {user.pan}</p>
          <p><b>DOB:</b> {user.dob}</p>
        </div>

        {/* KYC STATUS */}
        <div className="dash-card">
          <h3 className="dash-title">🔒 KYC Verification</h3>

          <p className="flex items-center gap-2">
            <b>Email Verified:</b>
            {user.emailVerified ? (
              <span className="text-green-700 font-bold">✔ Verified</span>
            ) : (
              <span className="text-red-600 font-bold">✘ Not Verified</span>
            )}
          </p>

          <p className="text-gray-600 mt-3">
            KYC strengthens your account security.
          </p>
        </div>

        {/* DOC UPLOAD */}
        <div className="dash-card">
          <h3 className="dash-title">📄 Document Upload</h3>
          <ul className="text-gray-700 space-y-2">
            <li>Aadhar: {user.aadharCardDocs ? "✔ Uploaded" : "✘ Pending"}</li>
            <li>PAN: {user.panCardDocs ? "✔ Uploaded" : "✘ Pending"}</li>
            <li>Address: {user.addressVerificationDocs ? "✔ Uploaded" : "✘ Pending"}</li>
            <li>Signature: {user.signatureDocs ? "✔ Uploaded" : "✘ Pending"}</li>
          </ul>
        </div>

      </div>

      {/* GLOBAL CSS FOR REUSABLE CLASSES */}
      <style>{`
        .dash-btn {
          padding: 14px 26px;
          color: white;
          font-weight: 600;
          border-radius: 10px;
          font-size: 1rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          transition: 0.2s ease;
        }
        .dash-btn:hover {
          transform: translateY(-2px);
        }

        .dash-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          border: 1px solid rgba(210, 170, 40, 0.25);
          box-shadow: 0 8px 28px rgba(0,0,0,0.06);
        }

        .dash-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #b8860b;
          margin-bottom: 12px;
        }
      `}</style>

    </div>
  );
};

export default Dashboard;
