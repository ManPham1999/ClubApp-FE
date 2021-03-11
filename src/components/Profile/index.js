import React, {Component, Fragment} from 'react';
import './index.css';
import Club from './Club';
import {Container, Row, Col} from 'reactstrap';
import {Tabs} from 'antd';
import '../Banner/banner';
import Banner from '../Banner/banner';
import {Suspense} from 'react';
import Profile from './Profile';
const {TabPane} = Tabs;
function callback(key) {
	console.log(key);
}
const Index = (props) => {
	const {userInfor} = props;
	return (
		<div>
			<Banner />
			<Container>
				<Col sm='12'>
					<div className='profile-page'>
						<Tabs defaultActiveKey='1' onChange={callback} size='large'>
							<TabPane tab='Thông tin cá nhân' key='1'>
								<Profile userInfor={userInfor} />
							</TabPane>
							{userInfor.userType === 'admin' ? (
								<TabPane key='2'></TabPane>
							) : (
								<TabPane tab='Câu lạc bộ đã tham gia' key='2'>
									{/* <Club clubs={getUserInfoById.club} userclubs={userclubs} /> */}
								</TabPane>
							)}
						</Tabs>
					</div>
				</Col>
			</Container>
		</div>
	);
};
export default Index;
