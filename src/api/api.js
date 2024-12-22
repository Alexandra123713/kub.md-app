import axios from 'axios';

const api = axios.create({
	baseURL: 'http://funsport95.com/api/',
});

api.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem('authToken');
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

export default api;
