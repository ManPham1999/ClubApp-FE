import React, {useState, useRef} from 'react';
import {Form, Input, Popconfirm, Button, Typography} from 'antd';
import {Row, Col, Container} from 'react-bootstrap';
import {AiOutlineUser, AiOutlineLock} from 'react-icons/ai';

import './Profile.css';

import swal from 'sweetalert';
import Axios from 'axios';

const {Title} = Typography;

const tailLayout = {
	wrapperCol: {offset: 7, span: 18},
};

const layout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 25,
	},
};
const layoutPass = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 20,
	},
};
const Authorization = localStorage.getItem('Authorization');

const Profile = (props) => {
	const {userInfor} = props;
	const [imageUpdate, setImageUpdate] = useState('');
	const inputEl = useRef(null);
	const [image, setImage] = useState({preview: '', raw: ''});

	const [user, setUser] = useState({
		password: '',
		newPassword: '',
		password2: '',
	});

	// const {password, newPassword, password2} = user;

	// const updateField = (e) => {
	// 	setUser({
	// 		...user,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	const handleChange = (e) => {
		if (e.target.files.length) {
			console.log(URL.createObjectURL(e.target.files[0]));
			setImage({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
	};
	console.log('userInfor: ', userInfor);
	const handleSubmit = () => {
		let formData = new FormData();
		formData.append('avatar', image.raw);
		swal('Đang cập nhật...');
		Axios({
			method: 'POST',
			url: ` https://funnyclub-be.herokuapp.com/api/student/upload-avatar/users/${userInfor._id}`,
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
			data: formData,
		})
			.then((res) => {
				if (res) {
					setImage({
						preview: '',
						raw: '',
					});
					return res;
				}
				return null;
			})
			.then((boo) => {
				if (boo !== null) {
					setImageUpdate(boo.data.info.avataUser);
					swal('Cập nhật hình ảnh thành công', 'Nice!', 'success');
				}
			})
			.catch((err) => {
				swal('Lỗi cập nhật hình ảnh', 'Poor', 'error');
			});
	};
	// const onFinish = (values) => {
	// 	handleSubmitChangePass();
	// };
	// const handleSubmitChangePass = () => {
	// 	swal('Đang cập nhật...');
	// 	const Authorization = localStorage.getItem('Authorization');
	// 	// console.log(Authorization);
	// 	Axios({
	// 		method: 'PUT',
	// 		url: `https://funnyclub-be.herokuapp.com/api/student/updatePassword`,
	// 		headers: {
	// 			Accept: 'application/json',
	// 			Authorization: `${Authorization}`,
	// 		},
	// 		data: {password, newPassword, password2},
	// 	})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			swal('Cập nhật thông tin thành công', 'Nice!', 'success');
	// 		})
	// 		.catch((err) => {
	// 			if (err.response.data.msg) {
	// 				return swal(
	// 					'Lỗi cập nhật thông tin',
	// 					`${err.response.data.msg}`,
	// 					'error',
	// 				);
	// 			}
	// 			return swal('Lỗi cập nhật thông tin', 'Poor', 'error');
	// 		});
	// };

	return (
		<div>
			<Container>
				<Row>
					<Col sm='12'>
						<Title level={3}>
							<AiOutlineUser className='icon_user'></AiOutlineUser>
							<span className='header_title_user'>Thông tin cá nhân</span>
						</Title>
						{userInfor.userType === 'admin' ? (
							''
						) : (
							<div type='file' className='img-avatar-profile'>
								<img
									className='img-circle'
									src={
										imageUpdate !== ''
											? imageUpdate
											: image.preview !== ''
											? image.preview
											: userInfor.info.avataUser
									}
								/>
								<div style={{textAlign: 'center'}}>
									<div
										className='upload-imgprofile'
										onClick={() => {
											inputEl.current.click();
										}}
									>
										UPLOAD
									</div>
									{image.raw ? (
										<Popconfirm
											placement='bottom'
											title='Bạn chắc chắn muốn chọn ảnh này ?'
											type='submit'
											onConfirm={handleSubmit}
											okText='Yes'
											cancelText='No'
										>
											<Button type='link'>Cập nhật</Button>
										</Popconfirm>
									) : (
										''
									)}
								</div>
							</div>
						)}

						<Form {...layout} labelAlign='left' className='profile-form'>
							{userInfor.userType === 'admin' ? (
								''
							) : (
								<Form.Item label='Cập nhật hình ảnh:' name='avatar' hidden>
									<input
										id='uploadAvatar'
										required
										name='avatar'
										type='file'
										onChange={handleChange}
										ref={inputEl}
									/>
								</Form.Item>
							)}
							{userInfor.userType === 'admin' ? (
								''
							) : (
								<Form.Item label='MSSV' className='password-form'>
									<Input
										value={userInfor.mssv}
										disabled
										compact='true'
										className='profile-form-input'
									/>
								</Form.Item>
							)}

							<Form.Item label='Họ và tên' className='password-form'>
								<Input
									value={
										userInfor.userType === 'admin'
											? 'admin'
											: userInfor.info.fullName
									}
									disabled
									className='profile-form-input'
								/>
							</Form.Item>
							{userInfor.userType === 'admin' ? (
								''
							) : (
								<Form.Item label='Khoa' className='password-form'>
									<Input
										className='profile-form-input'
										value={
											userInfor.info.major === 'cntt'
												? 'CÔNG NGHỆ THÔNG TIN'
												: userInfor.info.major === 'kiến trúc'
												? 'KIẾN TRÚC'
												: userInfor.info.major
										}
										disabled
									/>
								</Form.Item>
							)}
						</Form>
					</Col>
				</Row>

				<Row>
					<Col sm='12'>
						<Title level={3} className='header_pass changepassword'>
							<AiOutlineLock className='icon_user'></AiOutlineLock>
							<span className='header_title_pass'>Đổi mật khẩu</span>
						</Title>
						<Form
							{...layoutPass}
							labelAlign='left'
							// onFinish={onFinish}
							className='profile-form '
						>
							<Form.Item
								className='password-form'
								name='password'
								label='Mật khẩu cũ'
								rules={[
									{
										required: true,
										message: 'Vui lòng nhập mật khẩu cũ!',
									},
								]}
								hasFeedback
							>
								<Input.Password
									className='profile-form-input'
									// value={password}
									// onChange={updateField}
									name='password'
								/>
							</Form.Item>
							<Form.Item
								className='password-form'
								name='newPassword'
								label='Mật khẩu mới'
								rules={[
									{
										required: true,
										message: 'Vui lòng nhập mật khẩu mới!',
									},
								]}
								hasFeedback
							>
								<Input.Password
									className='profile-form-input'
									// value={newPassword}
									// onChange={updateField}
									name='newPassword'
									minLength={6}
								/>
							</Form.Item>

							<Form.Item
								className='password-form'
								name='password2'
								label='Nhập lại mật khẩu'
								dependencies={['newPassword']}
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Vui lòng nhập lại mật khẩu!',
									},
									({getFieldValue}) => ({
										validator(rule, value) {
											if (!value || getFieldValue('newPassword') === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												'chưa trùng khớp với mật khẩu trên!',
											);
										},
									}),
								]}
							>
								<Input.Password
									className='profile-form-input'
									// value={password2}
									// onChange={updateField}
									name='password2'
									minLength={6}
								/>
							</Form.Item>

							<Col sm='12'>
								<div className='changepassword-btn'>
									<Button
										color='blue'
										type='primary'
										htmlType='submit'
										type='submit'
									>
										Thay đổi mật khẩu
									</Button>
								</div>
							</Col>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Profile;
