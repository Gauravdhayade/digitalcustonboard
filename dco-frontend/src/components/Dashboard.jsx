import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName") || "User";

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h1 style={{margin:0}}>Hello, {name} 👋</h1>
          <p style={{color:'#6b7280'}}>Welcome back — here's your quick actions</p>
        </div>

        <div>
          <button className="btn" onClick={() => navigate("/account")}>Open Account</button>
        </div>
      </div>

      <div className="mt-6 grid-3">
        <div className="card">
          <h3>Accounts</h3>
          <p>Open and manage bank accounts</p>
          <div className="mt-6">
            <button className="btn secondary" onClick={() => navigate("/account")}>Open Account</button>
          </div>
        </div>

        <div className="card">
          <h3>KYC</h3>
          <p>Upload docs and track verification status</p>
          <div className="mt-6">
            <button className="btn" onClick={() => navigate("/upload-docs")}>Upload Docs</button>
          </div>
        </div>

        <div className="card">
          <h3>Transactions</h3>
          <p>Track deposits & withdrawals</p>
          <div className="mt-6">
            <button className="btn ghost" onClick={() => navigate("/transaction-history")}>View History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
