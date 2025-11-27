import React, { useEffect, useState } from "react";

const KycProgress = () => {
  const userId = localStorage.getItem("userId");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function load() {
      if (!userId) { setStatus("Not logged in"); return; }
      try {
        const res = await fetch(`http://localhost:8080/user-profile/kyc-status?userId=${userId}`);
        if (!res.ok) { setStatus("Error"); return; }
        const text = await res.text();
        setStatus(text);
      } catch (err) { setStatus("Error fetching"); }
    }
    load();
  }, [userId]);

  return (
    <div style={{maxWidth:760, margin:'0 auto'}}>
      <div className="card center">
        <h2>KYC Status</h2>
        <p style={{fontSize:22, marginTop:12}}>{status}</p>
      </div>
    </div>
  );
};

export default KycProgress;
