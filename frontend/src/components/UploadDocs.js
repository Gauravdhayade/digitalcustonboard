import React, { useState } from "react";
import { uploadDocs } from "../services/api";

export default function UploadDocs() {
  const [userId, setUserId] = useState("");
  const [files, setFiles] = useState({});

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleUpload = async () => {
    await uploadDocs(userId, files);
    alert("Documents uploaded successfully!");
    setFiles({});
    setUserId("");
  };

  return (
    <div className="mt-4">
      <h2>Upload Documents</h2>
      <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="file" name="aadharDocs" onChange={handleChange} />
      <input type="file" name="pancardDocs" onChange={handleChange} />
      <input type="file" name="signatureDocs" onChange={handleChange} />
      <input type="file" name="addressDocs" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
