import React from "react";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const navigate = useNavigate();

  const handleCreate = () => {
    // Step 1: Show success alert
    alert("🏦 Account Created Successfully!");

    // Step 2: Navigate to next page (transaction)
    navigate("/transaction");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #5D9FFF, #B8DCFF)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 50px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
          width: "400px",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#333" }}>
          Create New Bank Account
        </h2>
        <p style={{ marginBottom: "25px", color: "#555" }}>
          Fill details automatically linked from registration.
        </p>

        <button
          onClick={handleCreate}
          style={{
            background: "linear-gradient(90deg, #007bff, #00c6ff)",
            border: "none",
            color: "#fff",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Proceed to Deposit / Withdraw →
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
