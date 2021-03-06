import Axios from 'axios';
import * as Types from '../../constants/types.action';
import {fetchEvents, fetchFillterEvent} from '../../utils/EventApiCaller';

export const actGetAllEventRequest = () => async (dispatch) => {
	try {
		const events = await fetchEvents();
		dispatch(actGetAllEvent(events.data));
	} catch (error) {
		dispatch({
			type: Types.GET_ERRORS,
			payload: error,
		});
	}
};

export const getChartEvent = () => (dispatch) => {
	fetchFillterEvent()
		.then((res) => {
			console.log('res', res);
			dispatch(getChartAllEvent(res.data));
		})
		.catch((err) =>
			dispatch({
				type: Types.GET_ERRORS,
				payload: err,
			}),
		);
};
export const getChartAllEvent = (data) => {
	return {
		type: Types.GET_CHART_EVENT,
		data,
	};
};

export const actGetAllEvent = (data) => {
	return {
		type: Types.GET_ALL_EVENTS,
		data,
	};
};
