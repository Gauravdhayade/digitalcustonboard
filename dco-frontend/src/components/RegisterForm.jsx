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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        // Registration ok -> go to OTP page. Pass email in state (optional).
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-orange-200">
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md py-4 text-center">
        <h1 className="text-3xl font-bold text-white flex justify-center items-center gap-2">
          🏦 DigiBank
        </h1>
        <p className="text-white text-sm mt-1 opacity-90">Your Smart & Secure Digital Banking Partner</p>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8">
          <h2 className="text-2xl font-semibold text-orange-600 text-center mb-2">KDI Bank Registration</h2>
          <p className="text-gray-500 text-center mb-6 text-sm">Complete your digital onboarding securely</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <input name="firstName" placeholder="First Name" onChange={handleChange} required className="col-span-1 ..." />
              <input name="middleName" placeholder="Middle Name" onChange={handleChange} className="col-span-1 ..." />
              <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="col-span-1 ..." />
            </div>

            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full ..." />
            <input type="password" name="password" placeholder="Create Password" onChange={handleChange} required className="w-full ..." />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full ..." />
            <input type="text" name="pan" placeholder="PAN Number" onChange={handleChange} required className="w-full ..." />
            <input type="date" name="dob" onChange={handleChange} required className="w-full ..." />

            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">Register Now</button>
          </form>

          <div className="text-center mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-orange-600 hover:underline">Login here</a>
          </div>
        </div>
      </main>

      <footer className="text-center text-gray-500 text-sm py-4 border-t border-orange-200">
        © {new Date().getFullYear()} KDI Digital Bank. All Rights Reserved.
      </footer>
    </div>
  );
};

export default RegisterForm;
