import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = localStorage.getItem("userId"); // ✅ Dynamic userId from login
      const token = localStorage.getItem("authToken");

      if (!userId || !token) {
        alert("⚠️ Please login first!");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/auth/dashboard?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching dashboard:", err);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  // Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-orange-600 text-xl font-semibold">
        Loading your dashboard...
      </div>
    );
  }

  // Error case
  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold">
        ❌ Failed to load dashboard data.
      </div>
    );
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  // ✅ UI Layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md py-4 text-center">
        <h1 className="text-3xl font-bold text-white">🏦 DigiBank Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center py-10">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6 text-center">
            Welcome, {userData.firstName} {userData.lastName} 👋
          </h2>

          {/* Personal Details */}
          <section className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p>
                <strong>PAN:</strong> {userData.pan}
              </p>
              <p>
                <strong>DOB:</strong> {userData.dob}
              </p>
            </div>
          </section>

          {/* KYC Status */}
          <section className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              KYC Documents
            </h3>
            <ul className="text-sm text-gray-600">
              <li>
                📄 Aadhaar Card:{" "}
                {userData.aadharCardDocs ? "✅ Uploaded" : "❌ Pending"}
              </li>
              <li>
                🪪 PAN Card:{" "}
                {userData.panCardDocs ? "✅ Uploaded" : "❌ Pending"}
              </li>
              <li>
                🏠 Address Proof:{" "}
                {userData.addressVerificationDocs ? "✅ Uploaded" : "❌ Pending"}
              </li>
              <li>
                ✍️ Signature:{" "}
                {userData.signatureDocs ? "✅ Uploaded" : "❌ Pending"}
              </li>
            </ul>
          </section>

          {/* Account Summary */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Account Summary
            </h3>
            <p className="text-sm text-gray-600">
              Account Created:{" "}
              <strong>
                {userData.emailVerified
                  ? "✅ Verified"
                  : "⚠️ Pending Verification"}
              </strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Account Number: <strong>XXXX-XXXX-8907</strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Current Balance: <strong>₹ 50,000.00</strong>
            </p>
          </section>

          <div className="text-center mt-8">
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t border-orange-200">
        © {new Date().getFullYear()} KDI Digital Bank. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
