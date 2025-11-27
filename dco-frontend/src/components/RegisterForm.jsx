import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    email: "", password: "", phone: "", pan: "", dob: ""
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm(s => ({...s, [e.target.name]: e.target.value}));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const text = await res.text();
      if (res.ok || text.startsWith("registered:")) {
        alert("Registration successful. Verify OTP.");
        navigate("/verify-otp", { state: { email: form.email }});
      } else {
        alert("Registration failed: " + text);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24}}>
      <div style={{width:'100%', maxWidth:900, display:'flex', gap:24}}>
        <div style={{flex:1, background:'linear-gradient(135deg,#ffecd2,#fcb69f)', borderRadius:16, padding:28, color:'#1f2937'}}>
          <h2>Welcome to DigiBank</h2>
          <p>Fast, secure and paperless onboarding. Create an account in 2 minutes.</p>
          <div style={{marginTop:24}}>
            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331710.png" alt="bank" style={{width:160}}/>
          </div>
        </div>

        <div style={{flex:1, background:'#fff', borderRadius:12, padding:22}} className="card">
          <h3 className="center mb-4">Create Account</h3>
          <form onSubmit={onSubmit} style={{display:'grid', gap:12}}>
            <div className="grid-3">
              <input className="input" name="firstName" placeholder="First" onChange={onChange} required />
              <input className="input" name="middleName" placeholder="Middle" onChange={onChange} />
              <input className="input" name="lastName" placeholder="Last" onChange={onChange} required />
            </div>

            <input className="input" name="email" placeholder="Email" onChange={onChange} type="email" required />
            <input className="input" name="password" placeholder="Password" onChange={onChange} type="password" required />
            <div className="grid-2">
              <input className="input" name="phone" placeholder="Phone" onChange={onChange} required />
              <input className="input" name="pan" placeholder="PAN" onChange={onChange} required />
            </div>
            <input className="input" name="dob" type="date" onChange={onChange} required />

            <button className="btn" type="submit">{loading ? "Creating..." : "Create Account"}</button>

            <div style={{textAlign:'center', marginTop:8}}>
              Already registered? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
