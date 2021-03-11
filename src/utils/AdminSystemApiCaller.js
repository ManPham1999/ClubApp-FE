import Axios from 'axios';
const API_BASE_URL = 'http://funnyclub-be.herokuapp.com/api/admin';

const client = Axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const adminLogin = (params) => {
	return client.post('/login', params);
};
