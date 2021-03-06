import * as Types from "../../constants/types.action";
import axios from "axios";

export const getAllScheduleOfClub = (id) => (dispatch) => {
  axios
    .get(`https://funnyclub-be.herokuapp.com/api/club/getAllScheduleOfClub/${id}`)
    .then((res) => {
      dispatch({
        type: Types.GET_ALL_SCHEDULE_CLUB,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err,
      })
    );
};
