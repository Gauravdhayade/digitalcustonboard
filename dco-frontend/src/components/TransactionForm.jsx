import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ ${type} of ₹${amount} successful!`);
    navigate("/history");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FEE140, #FA709A)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px 40px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h2>💰 Make a Transaction</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "80%",
              marginBottom: "15px",
            }}
          />
          <br />
          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #43cea2, #185a9d)",
              color: "#fff",
              border: "none",
              padding: "10px 25px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Proceed →
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
