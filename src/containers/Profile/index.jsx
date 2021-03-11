import React, {useEffect, useState} from 'react';
import Profile from '../../components/Profile/index';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/banner';
import {connect} from 'react-redux';
import {} from '../../Redux/actions/student.action';
import {actGetAllClubRequest} from '../../Redux/actions/user-clubs.action';
import {getStudentById} from '../../utils/StudentApiCaller';
import {Fragment} from 'react';

const ProfilePage = (props) => {
	const {match} = props;
	const [infor, setInfor] = useState();
	useEffect(() => {
		const getUserInfo = async () => {
			let inforU = await getStudentById(match.params.id);
			if (inforU) {
				setInfor(inforU);
			}
		};
		getUserInfo();
	}, [match.params.id]);
	console.log(infor);
	return (
		<Fragment>
			<Header />
			{infor !== undefined ? (
				<div>
					<Profile userInfor={infor} />
				</div>
			) : (
				<button class='loading-button'>
					<i class='fa fa-spinner fa-spin'></i>
				</button>
			)}
			<Footer />
		</Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		getUserInfoById: state.getUserInfoById,
		userclubs: state.userClubs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllclbs: () => dispatch(actGetAllClubRequest()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
