import React, { useState } from "react";

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  const handlePhoto = (e) => {
    const f = e.target.files[0];
    setPhoto(f);
    setPreview(URL.createObjectURL(f));
  };

  const upload = async () => {
    if (!photo) { alert("Choose photo"); return; }
    const fd = new FormData();
    fd.append("userId", userId);
    fd.append("profilePhoto", photo);
    try {
      const res = await fetch("http://localhost:8080/auth/upload-profile-photo", { method:"POST", body:fd});
      const txt = await res.text();
      alert(txt);
    } catch (err) {
      alert("Upload error");
    }
  };

  return (
    <div style={{maxWidth:760, margin:'0 auto'}}>
      <div className="card">
        <div style={{display:'flex', gap:18, alignItems:'center'}}>
          <div style={{width:96, height:96, borderRadius:12, overflow:'hidden', background:'#f3f4f6'}}>
            {preview ? <img src={preview} alt="preview" style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <div style={{padding:18}}>No Photo</div>}
          </div>
          <div>
            <h3 style={{margin:0}}>{name}</h3>
            <p style={{margin:0, color:'#6b7280'}}>{email}</p>
            <p style={{marginTop:6, fontSize:13, color:'#6b7280'}}>User ID: {userId}</p>
          </div>
        </div>

        <div style={{marginTop:16}}>
          <input type="file" accept="image/*" onChange={handlePhoto} />
          <button className="btn" onClick={upload} style={{marginLeft:10}}>Upload Photo</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
