import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);

  const onChange = e => setCreds(s => ({...s, [e.target.name]: e.target.value}));

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(creds)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", `${data.firstName || ""} ${data.lastName || ""}`.trim());
        localStorage.setItem("userEmail", data.email);
        alert("Login success");
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24}}>
      <div style={{width:'100%', maxWidth:420}}>
        <div className="card">
          <h2 className="center mb-4">Login</h2>
          <form onSubmit={onLogin} style={{display:'grid', gap:12}}>
            <input className="input" name="email" type="email" placeholder="Email" onChange={onChange} required />
            <input className="input" name="password" type="password" placeholder="Password" onChange={onChange} required />
            <button className="btn" type="submit">{loading ? "Signing in..." : "Sign in"}</button>
          </form>
          <div className="mt-6 center">
            <a href="/">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
