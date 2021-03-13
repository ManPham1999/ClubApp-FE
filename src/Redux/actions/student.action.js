import * as Types from '../../constants/types.action';
import {
	getStudentById,
	StudentLogin,
	StudentRegist,
} from '../../utils/StudentApiCaller';
import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import {
	fetchStudents,
	fetchFillterStudents,
} from '../../utils/StudentApiCaller';

export const loginStudent = (userName, passWord) => async (dispatch) => {
	const stdLogin = await StudentLogin({userName, passWord});
	if (stdLogin.data) {
		if (stdLogin.data.userName || stdLogin.data.passWord) {
			let Loi = stdLogin.data.userName || stdLogin.data.passWord;
			dispatch(showLoi(Loi));
		} else {
			const token = stdLogin.data.token;
			localStorage.setItem('Authorization', stdLogin.data.token);
			const decoded = jwtDecode(token);
			dispatch(setCurrentUser(decoded));
		}
	}
};
export const logOut = () => {
	return (dispatch) => {
		// xoa localstorage
		localStorage.removeItem('Authorization');
		// xoa current user
		dispatch(setCurrentUser({}));
	};
};
export const showLoi = (bug) => {
	return {
		type: Types.GET_BUG_LOGIN,
		payload: bug,
	};
};
export const showLoiDangKy = (bug) => {
	return {
		type: Types.GET_BUG_REGIST,
		payload: bug,
	};
};

export const setCurrentUser = (data) => {
	return {
		type: Types.SET_CURRENT_USER,
		payload: data,
	};
};

export const RegistStudents = (
	userName,
	passWord,
	passWord2,
	classMajor,
	fullName,
	mssv,
	major,
) => (dispatch) => {
	return fetch(
		`https://funnyclub-be.herokuapp.com/api/student/registerUser`,
		{
			method: 'POST',
			body: JSON.stringify({
				userName,
				passWord,
				passWord2,
				classMajor,
				fullName,
				mssv,
				major,
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
	)
		.then((resp) => resp.json())
		.catch(function (error) {
			// handle lỗi
			console.log(error);
		})
		.then((data) => {
			// console.log(data);
			// console.log(data.userName, data.passWord);
			var LoiDangKy = '';
			if (
				data.userName === 'Tên đăng nhập đã tồn tại' ||
				data.mssv === 'MSSV không được trùng'
			) {
				LoiDangKy = data.userName || data.mssv;
				dispatch(showLoiDangKy(LoiDangKy));
				console.log('LoiDangKy : ', LoiDangKy);
			} else {
				dispatch({
					type: Types.REGIST_SUCCESS,
					payload: data,
				});
			}
		});
};

// export const  = (id) => {
// 	return async (dispatch) => {
// 		const stu = await getStudentById(id);
// 		if (stu) {
// 			dispatch({
// 				type: Types.GET_USER_BY_ID,
// 				payload: stu,
// 			});
// 		}
// 		// const Authorization = localStorage.getItem('Authorization');
// 		// if (Authorization) {
// 		//     return fetch(`https://funnyclub-be.herokuapp.com/api/student/${id}`, {
// 		//         method: 'GET',
// 		//         headers: {
// 		//             'Content-Type': 'application/json',
// 		//             Accept: 'application/json',
// 		//             Authorization: `${Authorization}`,
// 		//         },
// 		//     })
// 		//         .then((resp) => resp.json())
// 		//         .then((data) => {
// 		//             dispatch({
// 		//                 type: Types.GET_USER_BY_ID,
// 		//                 payload: data,
// 		//             });
// 		//         });
// 		// }
// 	};
// };
// student statistics
export const actGetAllStudentRequest = () => (dispatch) => {
	const Authorization = localStorage.getItem('Authorization');
	if (Authorization) {
		Axios({
			method: 'GET',
			url: `https://funnyclub-be.herokuapp.com/api/student/getAllUser`,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				dispatch(actGetAllStudent(res.data));
			})
			.catch((err) => {
				dispatch({
					type: Types.GET_ERRORS,
					payload: err,
				});
			});
	}
};

export const getChartStudent = () => (dispatch) => {
	const Authorization = localStorage.getItem('Authorization');
	if (Authorization) {
		Axios({
			method: 'GET',
			url: `https://funnyclub-be.herokuapp.com/api/student/fillterStudent`,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				dispatch(getChartAllStudent(res.data));
			})
			.catch((err) => {
				dispatch({
					type: Types.GET_ERRORS,
					payload: err,
				});
			});
	}
};

export const getChartAllStudent = (data) => {
	return {
		type: Types.GET_CHART_STUDENT,
		data,
	};
};

export const actGetAllStudent = (data) => {
	return {
		type: Types.GET_ALL_STUDENT,
		data,
	};
};
