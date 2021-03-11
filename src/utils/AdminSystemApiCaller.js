import Axios from 'axios';
const API_BASE_URL = 'https://localhost:5050/api/admin';

const client = Axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const adminLogin = (params) => {
	return client.post('/login', params);
};
