import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">🏦 DigiBank</h2>

        <ul className="space-y-4 text-lg">
          <li>
            <Link to="/dashboard" className="hover:text-blue-600">📊 Dashboard</Link>
          </li>
          <li>
            <Link to="/kyc" className="hover:text-blue-600">🪪 KYC Status</Link>
          </li>
          <li>
            <Link to="/upload-docs" className="hover:text-blue-600">📄 Upload Documents</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-blue-600">👤 My Profile</Link>
          </li>
          <li>
            <button 
              onClick={() => { localStorage.clear(); window.location.href="/login"; }}
              className="text-red-500 hover:text-red-700">
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default Layout;
