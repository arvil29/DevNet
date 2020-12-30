import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

//this is root reducer

export default combineReducers({
  alert,
  auth,
});
