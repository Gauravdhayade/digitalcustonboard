import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import VerifyOtp from "./components/VerifyOtp.jsx";

import Dashboard from "./components/Dashboard.jsx";

import UploadDocs from "./components/UploadDocs.jsx";
import KycProgress from "./components/KycProgress.jsx";

import Profile from "./components/Profile.jsx";

import TransactionForm from "./components/TransactionForm.jsx";
import TransactionHistory from "./components/TransactionHistory.jsx";

import AccountOpenForm from "./components/AccountOpenForm.jsx";


function App() {
	return (
		<Router>
			<Routes>

				{/* AUTH */}
				<Route path="/" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/verify-otp" element={<VerifyOtp />} />

				{/* DASHBOARD */}
				<Route path="/dashboard" element={<Dashboard />} />

				{/* KYC */}
				<Route path="/upload-docs" element={<UploadDocs />} />
				<Route path="/kyc-status" element={<KycProgress />} />

				{/* PROFILE */}
				<Route path="/profile" element={<Profile />} />

				{/* ACCOUNT */}
				<Route path="/account" element={<AccountOpenForm />} />

				{/* TRANSACTIONS */}
				<Route path="/transactions" element={<TransactionForm />} />
				<Route path="/transaction-history" element={<TransactionHistory />} />

			</Routes>
		</Router>

	);
}

export default App;
