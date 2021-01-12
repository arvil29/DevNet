import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//how actions are working:
// 1. call backend API that returns res data
// 2. pass in res data as payload & dispatch (call specific reducer)
// 3. reducer updates the state w/ new res data passed in

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();

  //add alert --> calls alert reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  //remove alert after 3 seconds --> calls alert reducer
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
