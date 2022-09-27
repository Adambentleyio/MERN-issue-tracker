import issues from "../apis/issues";
import history from "../history";
import axios from "axios";

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const createIssue = (formValues) => {
  return async (dispatch, getState) => {
    try {
      const { userId } = getState().auth;
      const postData = { ...formValues, createdAt: new Date(), userId };
      const response = await issues.post("/issues", postData);

      dispatch({
        type: "CREATE_ISSUE",
        payload: response.data,
        // userId: userId,
      });
      // after we dispatch the action, programatically navigate to root route
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchIssues = () => async (dispatch) => {
  try {
    const response = await axios.get("/issues");
    // console.log(response.data);

    dispatch({ type: "FETCH_ISSUES", payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchIssue = (id) => async (dispatch) => {
  try {
    const response = await issues.get(`/issues/${id}`);

    dispatch({ type: "FETCH_ISSUE", payload: response.data });
  } catch (error) {
console.log(error.message);
  }
};

export const editIssue = (id, formValues) => async (dispatch) => {
  try {
    const response = await issues.patch(`/issues/${id}`, formValues);

    dispatch({ type: "EDIT_ISSUE", payload: response.data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const deleteIssue = (id) => async (dispatch) => {
  try {
    await issues.delete(`/issues/${id}`);

    dispatch({
      type: "DELETE_ISSUE",
      payload: id,
    });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
