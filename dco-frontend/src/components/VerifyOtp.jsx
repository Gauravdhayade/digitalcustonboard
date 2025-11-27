import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = location.state?.email || "";

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/verify-otp", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ otp, email })
      });
      if (res.ok) {
        alert("OTP verified");
        navigate("/login");
      } else {
        const t = await res.text();
        alert("Failed: " + t);
      }
    } catch (err) { alert("Server error"); }
  };

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24}}>
      <div style={{width:'100%', maxWidth:420}}>
        <div className="card center">
          <h3>Verify OTP</h3>
          <p>Enter OTP sent to {email || "your email"}</p>
          <form onSubmit={submit} style={{display:'grid', gap:12}}>
            <input className="input" value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" required />
            <button className="btn" type="submit">Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
