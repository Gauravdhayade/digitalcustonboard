import React from "react";

const Header = () => {
  const name = localStorage.getItem("userName") || "Guest";
  return (
    <header className="header">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <h3 style={{margin:0}}>Welcome, <b>{name}</b></h3>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div style={{fontSize:14, color:"#6b7280"}}>Support</div>
        <button className="btn ghost" onClick={() => alert("Support: contact@digibank.example")}>Contact</button>
      </div>
    </header>
  );
};

export default Header;
