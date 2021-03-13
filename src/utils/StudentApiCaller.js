import Axios from 'axios';
import axios from 'axios';
const API_BASE_URL = 'https://funnyclub-be.herokuapp.com/api/student';

const client = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const StudentLogin = (params) => {
	try {
		return client.post('/login', params);
	} catch (error) {
		console.log(error);
		console.log(error.data);
	}
};

export const StudentRegist = (params) => {
	try {
		return client.post('/registerUser', params);
	} catch (error) {
		console.log(error);
	}
};
// chart

export const fetchStudents = () => {
	return client.get('/getAllUser');
};

export const fetchFillterStudents = () => {
	return client.get('/fillterStudent');
};
export const getStudentById = (id) => {
	const Authorization = localStorage.getItem('Authorization');
	if (Authorization) {
		return Axios({
			method: 'GET',
			url: `${API_BASE_URL}/${id}`,
			headers: {
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

// export const createTask = (params) => {
// 	return client.post('/Tasks', params);
// };

// export const updateTask = (id, params) => {
// 	return axios.put(`${API_BASE_URL}/Tasks/${id}`, params);
// };
