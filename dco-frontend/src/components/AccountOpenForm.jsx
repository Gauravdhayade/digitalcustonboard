import React, { useState } from "react";

const AccountOpenForm = () => {
  const userId = localStorage.getItem("userId");
  const [accountType, setAccountType] = useState("SAVINGS");
  const [deposit, setDeposit] = useState("");
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) { alert("Please login first"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/bank/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          userId,
          accountType,
          initialDeposit: deposit,
        })
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed");
      }
      const data = await res.json();
      setSuccess(data);
      alert("Account created");
    } catch (err) {
      alert("Failed: " + err.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={{maxWidth:760, margin:'0 auto'}}>
      <div className="card">
        <h2>Open New Bank Account</h2>
        <p>Link account to your profile (user id: {userId || "not logged in"})</p>

        <form onSubmit={handleSubmit} style={{display:'grid', gap:12, marginTop:12}}>
          <label>Account Type</label>
          <select className="input" value={accountType} onChange={(e)=>setAccountType(e.target.value)}>
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>

          <label>Initial Deposit</label>
          <input className="input" type="number" value={deposit} onChange={(e)=>setDeposit(e.target.value)} placeholder="Amount in ₹" />

          <button className="btn" type="submit">{loading ? "Creating..." : "Create Account"}</button>
        </form>

        {success && (
          <div style={{marginTop:18}} className="card">
            <b>Account Created</b>
            <div>Account Number: {success.accountNumber}</div>
            <div>Balance: ₹{success.balance}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountOpenForm;
