import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ISSUES":
      return {
        ...state,
        ..._.mapKeys(action.payload, "_id"),
      };

    case "FETCH_ISSUE":
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    case "DELETE_ISSUE":
      return Object.keys(state).reduce((newState, key) => {
        if (key !== action.payload) newState[key] = state[key];
        return newState;
      }, {});
    case "EDIT_ISSUE":
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    case "CREATE_ISSUE":
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    default:
      return state;
  }
};
