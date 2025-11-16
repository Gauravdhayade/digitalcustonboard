// src/components/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    pan: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("🎉 Registration successful! Please verify OTP.");
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        const text = await response.text();
        alert("❌ Registration failed: " + text);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Check backend.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 to-yellow-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg py-5 text-center">
        <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-sm flex justify-center items-center gap-3">
          🏦 KDI Digital Bank
        </h1>
        <p className="text-white text-sm mt-1 opacity-90">
          Premium • Secure • Digital Banking
        </p>
      </header>

      {/* MAIN FORM */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-8 border border-yellow-200">

          <h2 className="text-2xl font-semibold text-yellow-600 text-center mb-1">
            Open Your Digital Account
          </h2>
          <p className="text-gray-500 text-center mb-5 text-sm">
            Complete your digital onboarding securely
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name Fields */}
            <div className="grid grid-cols-3 gap-3">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="col-span-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />

              <input
                name="middleName"
                placeholder="Middle Name"
                onChange={handleChange}
                className="col-span-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="col-span-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            {/* PAN */}
            <input
              type="text"
              name="pan"
              placeholder="PAN Number"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm uppercase focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            {/* DOB */}
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-white py-2 rounded-lg font-semibold shadow-md"
            >
              Register Now
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-600 font-semibold hover:underline">
              Login here
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t border-yellow-200">
        © {new Date().getFullYear()} KDI Digital Bank. All Rights Reserved.
      </footer>

    </div>
  );
};

export default RegisterForm;
