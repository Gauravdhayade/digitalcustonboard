import axios from "axios";

const API_BASE = "http://localhost:8080/user-profile";

// User CRUD
export const getAllUsers = () => axios.get(`${API_BASE}/user-profile-data`);
export const getUserById = (id) => axios.get(`${API_BASE}/user-profile-data/${id}`);
export const saveUser = (data) => axios.put(`${API_BASE}/save-user-profile`, data);
export const updateUser = (data) => axios.put(`${API_BASE}/update-user-profile`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE}/delete-user?userId=${id}`);

// File Upload
export const uploadDocs = (userId, files) => {
	let formData = new FormData();
	Object.keys(files).forEach((key) => {
		formData.append(key, files[key]);
	});
	return axios.put(`${API_BASE}/file/upload?userId=${userId}`, formData, {
		headers: { "Content-Type": "multipart/form-data"},
	});
};
