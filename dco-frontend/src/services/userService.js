import axios from "axios";

const API_BASE = "http://localhost:8080";

export const registerUser = async (userData) => {
	return axios.post(`${API_BASE}/auth/register`, userData);
};

export const verifyOtp = async (otpData) => {
	return axios.post(`${API_BASE}/verify-otp`, otpData);
};

export const uploadDocs = async (formData) => {
	return axios.post(`${API_BASE}/upload-docs`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const loginUser = async (email, password) => {
	return axios.post(`${API_BASE}/auth/login`, { email, password });
};

export const fetchDashboardData = async () => {
	return axios.get(`${API_BASE}/user-profile-data`);
};
