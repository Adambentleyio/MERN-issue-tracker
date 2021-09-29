import { combineReducers } from "redux";
import issuesReducer from "./issuesReducer";
import authReducer from "./AuthReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  issues: issuesReducer,
  auth: authReducer,
  form: formReducer,
});
