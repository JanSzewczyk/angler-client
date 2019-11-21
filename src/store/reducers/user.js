import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  userInformation: {},
  loading: true
};

const userGetInfoStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const userGetInfoSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userInformation: action.info
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_INFO_START:
      return userGetInfoStart(state, action);
    case actionTypes.USER_INFO_SUCCESS:
      return userGetInfoSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
