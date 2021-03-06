import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import StudentDecent from './StudentDecent';
import Axios from 'axios';
import {} from '../../../../../Redux/actions/student.action';
import {actGetAllClubRequest} from '../../../../../Redux/actions/user-clubs.action';

function UserDecent(props) {
	const {
		match,
		history,
		,
		getUserInfoById,
		userClubs,
		getAllClub,
	} = props;
	const {id} = match.params;
	useEffect(() => {
		getAllClub();
	}, [id]);
	return (
		<Fragment>
			<StudentDecent
				id={id}
				data={props.location.state.data}
				clubs={userClubs}
				history={history}
			/>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	getUserInfoById: state.getUserInfoById,
	userClubs: state.userClubs,
});

const mapDispatchToProps = (dispatch) => ({
	
	getAllClub: () => dispatch(actGetAllClubRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDecent);
