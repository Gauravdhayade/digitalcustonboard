import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🏦 DigiBank</h1>
      <ul>
        <li><Link to="/">Register</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/transaction">Transactions</Link></li>
        <li><Link to="/history">History</Link></li>
      </ul>
    </nav>
  );
}
