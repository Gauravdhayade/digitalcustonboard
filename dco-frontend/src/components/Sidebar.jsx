import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">🏦 DigiBank</div>
      <nav>
        <NavLink className="menu-item" to="/dashboard">📊 Dashboard</NavLink>
        <NavLink className="menu-item" to="/upload-docs">📄 Upload Docs</NavLink>
        <NavLink className="menu-item" to="/kyc-status">🪪 KYC Status</NavLink>
        <NavLink className="menu-item" to="/account">🏦 Open Account</NavLink>
        <NavLink className="menu-item" to="/transactions">➕ Transactions</NavLink>
        <NavLink className="menu-item" to="/transaction-history">📑 History</NavLink>
        <NavLink className="menu-item" to="/profile">👤 Profile</NavLink>
      </nav>
      <div style={{marginTop:16}}>
        <button className="btn ghost" onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
