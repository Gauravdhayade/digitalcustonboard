import React from "react";

function TransactionHistory() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #84fab0, #8fd3f4)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h2>📜 Transaction History</h2>
        <p>No transactions found yet. Your account is ready!</p>
      </div>
    </div>
  );
}

export default TransactionHistory;
