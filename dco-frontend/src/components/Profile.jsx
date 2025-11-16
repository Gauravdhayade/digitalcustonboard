import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
    userId: localStorage.getItem("userId"),
  };

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  // When a new photo is selected
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // Save photo to backend
  const handleSavePhoto = async () => {
    if (!photo) {
      alert("Please select a photo first!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("profilePhoto", photo);

    try {
      const res = await fetch("http://localhost:8080/auth/upload-profile-photo", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      alert(text);
    } catch (err) {
      alert("Error uploading photo: " + err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center bg-white/80 px-6 py-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">👤 Profile</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Profile Info Box */}
      <div className="max-w-xl mx-auto bg-white mt-10 p-8 rounded-xl shadow-lg border">

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6">
        
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Default Avatar"
                className="w-full h-full object-cover opacity-70"
              />
            )}
          </div>

          <label className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
            Choose Photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>

          <button
            onClick={handleSavePhoto}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Save Photo
          </button>
        </div>

        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Your Basic Information
        </h2>

        <p className="text-gray-700 text-lg">
          <b>Name:</b> {user.name}
        </p>

        <p className="text-gray-700 text-lg mt-2">
          <b>Email:</b> {user.email}
        </p>

        <p className="text-gray-700 text-lg mt-2">
          <b>User ID:</b> {user.userId}
        </p>

        <p className="text-gray-600 mt-6">
          Update your profile photo anytime for better personalization.
        </p>
      </div>
    </div>
  );
};

export default Profile;
