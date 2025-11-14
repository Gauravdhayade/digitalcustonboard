import axios from "axios";

const BASE_URL = "http://localhost:8080/user-profile";

export const registerUser = (data) => {
  return axios.post(`${BASE_URL}/verify-user`, data);
};

export const verifyOtp = (payload) => {
  return axios.post(`${BASE_URL}/validate-token`, null, { params: payload });
};

export const uploadDocs = (userId, formData) => {
  return axios.put(`${BASE_URL}/file/upload?userId=${userId}`, formData);
};

export const fetchUsers = () => {
  return axios.get(`${BASE_URL}/user-profile-data`);
};

// ✅ Added for Dashboard
export const getDashboardData = () => {
  return axios.get(`${BASE_URL}/user-profile-data`);
};
