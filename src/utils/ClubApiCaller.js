import axios from 'axios';
const API_BASE_URL = 'https://funnyclub-be.herokuapp.com/api/club';

const client = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const fetchClubs = () => {
	return client.get('/getAllClub');
};

export const fetchFillterClub = () => {
	return client.get('/fillterClub');
};

export const fetchCreateClub = (body) => {
	return client.post('/create/ImageClub', body);
};
// export const createTask = (params) => {
// 	return client.post('/Tasks', params);
// };

// export const updateTask = (id, params) => {
// 	return axios.put(`${API_BASE_URL}/Tasks/${id}`, params);
// };
