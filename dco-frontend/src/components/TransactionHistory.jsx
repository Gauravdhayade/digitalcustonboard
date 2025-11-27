import React from "react";

const TransactionHistory = () => {
  // For demo only - integrate real API
  const txns = [];

  return (
    <div style={{maxWidth:760, margin:'0 auto'}}>
      <div className="card">
        <h3>Transaction History</h3>
        {txns.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {txns.map(t => <li key={t.id}>{t.type} ₹{t.amount} on {t.timestamp}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
