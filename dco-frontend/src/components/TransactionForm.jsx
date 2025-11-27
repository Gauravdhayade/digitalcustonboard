import React, { useState } from "react";

const TransactionForm = () => {
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const userId = localStorage.getItem("userId");

  const submit = async (e) => {
    e.preventDefault();
    if (!userId) { alert("Login first"); return; }
    // For demo we just show alert — integrate with backend transaction API if present
    alert(`✅ ${type} of ₹${amount} successful`);
    setAmount("");
  };

  return (
    <div style={{maxWidth:760, margin:'0 auto'}}>
      <div className="card">
        <h3>Make a Transaction</h3>
        <form onSubmit={submit} style={{display:'grid', gap:12}}>
          <select className="input" value={type} onChange={e=>setType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
          <input className="input" type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount in ₹" />
          <button className="btn" type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
