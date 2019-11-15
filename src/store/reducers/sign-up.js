import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  confirmation: false,
  loading: false,
  error: false,
  errorMessage: ""
};

const signupInit = (state, action) => {
  return updateObject(state, {
    confirmation: false,
    loading: false,
    error: false,
    errorMessage: ""
  })
}

const signupStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false,
    errorMessage: ""
  })
}

const signupSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    confirmation: true
  })
}

const signupFail = (state, action) => {
  return updateObject(state, {
    confirmation: false,
    loading: false,
    error: true,
    errorMessage: action.errorMessage
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_INIT:
      return signupInit(state, action);
    case actionTypes.SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAIL:
      return signupFail(state, action);
    default:
      return state;
  }
};

export default reducer;
