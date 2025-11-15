import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterForm from "./components/RegisterForm";
import VerifyOtp from "./components/VerifyOtp";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

import Profile from "./components/Profile";
import KycProgress from "./components/KycProgress";
import UploadDocs from "./components/UploadDocs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kyc" element={<KycProgress />} />
        <Route path="/upload-docs" element={<UploadDocs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
