// src/components/VerifyOtp.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");

  // optional: get email from register step
  const passedEmail = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // backend only checks otp currently; we send otp (and email optionally)
      const response = await fetch("http://localhost:8080/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email: passedEmail }),
      });

      if (response.ok) {
        alert("✅ OTP verified successfully. Please login now.");
        navigate("/login");
      } else {
        const text = await response.text();
        alert("❌ OTP verification failed: " + text);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-3">🔐 Verify OTP</h2>
        <p className="text-gray-600 mb-4">Enter the 6-digit OTP sent to {passedEmail || "your email"}.</p>

        <form onSubmit={handleSubmit}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP (123456)"
            className="w-full p-2 border rounded mb-4 text-center"
            required
          />
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
