import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// Attach token for secured requests
axios.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

export const registerUser = async (userData) => {
	// BACKEND: /api/auth/register
	return axios.post(`${API_BASE}/auth/register`, userData);
};

export const verifyOtp = async (otpData) => {
	// BACKEND: /api/auth/verify-otp
	return axios.post(`${API_BASE}/auth/verify-otp`, otpData);
};

export const uploadDocs = async (formData) => {
	// BACKEND: /api/user/upload-docs
	return axios.post(`${API_BASE}/user/upload-docs`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const loginUser = async (email, password) => {
<<<<<<< HEAD
	// BACKEND: /api/auth/login
=======
>>>>>>> de9aa8e6555b16cb4116f5043ffd4742619453ad
	return axios.post(`${API_BASE}/auth/login`, { email, password });
};

export const fetchDashboardData = async () => {
	// BACKEND: /api/user/profile-details
	return axios.get(`${API_BASE}/user/profile-details`);
};
