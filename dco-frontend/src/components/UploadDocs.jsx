import React, { useState } from "react";

const UploadDocs = () => {
  const userId = localStorage.getItem("userId");
  const [aadhar, setAadhar] = useState(null);
  const [pancard, setPancard] = useState(null);
  const [address, setAddress] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("upload clicked");

    if (!userId) { alert("Please login"); return; }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("aadhar", aadhar);
    formData.append("pan", pancard);
    formData.append("address", address);       // add this if backend expects it
    formData.append("signature", signature);

    // debug: list keys
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1] && pair[1].name ? pair[1].name : pair[1]);
    }

    try {
      const res = await fetch("http://localhost:8080/kyc/upload", {
        method: "POST",
        body: formData,
        // mode: 'cors'  // optional
      });

      console.log("fetch finished, status:", res.status);
      const text = await res.text();
      if (res.ok) alert(text);
      else {
        console.error("Upload failed body:", text);
        alert("Upload failed: " + text);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error: " + err.message);
    }
  };



  return (
    <div style={{maxWidth:760, margin:'0 auto'}}>
      <div className="card">
        <h2>Upload KYC Documents</h2>
        <form onSubmit={handleSubmit} style={{display:'grid', gap:12, marginTop:12}}>
          <div>
            <label>Aadhar</label>
            <input type="file" accept="image/*,application/pdf" onChange={e=>setAadhar(e.target.files[0])} />
          </div>
          <div>
            <label>PAN</label>
            <input type="file" accept="image/*,application/pdf" onChange={e=>setPancard(e.target.files[0])} />
          </div>
          <div>
            <label>Address Proof</label>
            <input type="file" accept="image/*,application/pdf" onChange={e=>setAddress(e.target.files[0])} />
          </div>
          <div>
            <label>Signature</label>
            <input type="file" accept="image/*,application/pdf" onChange={e=>setSignature(e.target.files[0])} />
          </div>

          <button className="btn" type="submit">Upload Documents</button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocs;
