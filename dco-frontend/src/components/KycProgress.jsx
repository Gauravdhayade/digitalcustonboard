import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KycProgress = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch(`http://localhost:8080/auth/dashboard-by-email?email=${email}`);
      const data = await res.json();
      if (res.ok) setUser(data);
    };

    loadUser();
  }, [email]);

  if (!user)
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-green-700">🔐 KYC Status</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Status Box */}
      <div className="max-w-xl mx-auto bg-white mt-10 p-8 rounded-xl shadow-lg border">

        <h2 className="text-xl font-semibold text-green-700 mb-4">Verification Details</h2>

        <div className="space-y-5">

          <div>
            <b>Email Verification:</b>{" "}
            {user.emailVerified ? (
              <span className="text-green-600 font-bold">✔ Verified</span>
            ) : (
              <span className="text-red-600 font-bold">✘ Pending</span>
            )}
          </div>

          <div>
            <b>Uploaded Documents:</b>
            <ul className="mt-2 text-gray-700">
              <li>Aadhar: {user.aadharCardDocs ? "✔ Done" : "✘ Pending"}</li>
              <li>PAN: {user.panCardDocs ? "✔ Done" : "✘ Pending"}</li>
              <li>Address: {user.addressVerificationDocs ? "✔ Done" : "✘ Pending"}</li>
              <li>Signature: {user.signatureDocs ? "✔ Done" : "✘ Pending"}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KycProgress;
