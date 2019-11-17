import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  tokenType: null,
  error: false,
  errorMessage: "",
  access: false,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    access: false,
    error: false,
    errorMessage: ""
  });
};

const authAccess = (state, action) => {
  return updateObject(state, {
    access: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.accessToken,
    tokenType: action.tokenType,
    error: false,
    loading: false,
    access: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMessage: action.errorMessage,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, tokenType: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_ACCESS:
      return authAccess(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
