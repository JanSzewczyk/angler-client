import axios from "../../axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccessStart = (token, type) => {
  return dispatch => {
    dispatch(authAccess());

    setTimeout(() => {
      dispatch(authSuccess(token, type));
    }, 3000);
  };
};

export const authAccess = () => {
  return {
    type: actionTypes.AUTH_ACCESS
  };
};

export const authSuccess = (token, type) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    accessToken: token,
    tokenType: type
  };
};

export const authFail = errorMessage => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMessage: errorMessage
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("tokenType");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    const queryParams =
      "?grant_type=password&username=" + email + "&password=" + password;
    const config = {
      headers: {
        authorization:
          "Basic ZmlzaGxvZ2NsaWVudGlkOlptbHphR3h2WnkxaVlXTnJaVzVrTFdGd2NHeHBZMkYwYVc5dURRbw=="
      }
    };

    axios
      .post("/oauth/token" + queryParams, {}, config)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expires_in * 1000
        );
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("tokenType", response.data.token_type);
        dispatch(
          authSuccessStart(response.data.access_token, response.data.token_type)
        );
        dispatch(checkAuthTimeout(response.data.expires_in));
      })
      .catch(err => {
        let errorMessage = "Unknown problem, sorry :(";
        if (err.response) {
          if (err.response.status === 401) {
            errorMessage = err.response.data.error_description;
          }
          if (err.response.status === 400) {
            errorMessage = "Invalid password :(";
          }
        }

        dispatch(authFail(errorMessage));
      });
  };
};

// TODO !!!!!!!!!!!!!!!!!!  tokens
export const authCheckState = () => {
  return dispatch => {
	const token = localStorage.getItem("token");
	
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const tokenType = localStorage.getItem("tokenType");
        dispatch(authSuccess(token, tokenType));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
