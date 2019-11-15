import axios from "../../axios-home";

import * as actionTypes from "./actionTypes";

export const signupInit = () => {
  return {
    type: actionTypes.SIGNUP_INIT
  }
}

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  }
}

export const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS
  }
}

export const signupFail = (errorMessage) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    errorMessage: errorMessage
  }
}

export const signup = (data) => {
  return dispatch => {
    dispatch(signupStart())

    axios
      .post("/signup", data)
      .then(res => {
        console.log(res)
        dispatch(signupSuccess())
      })
      .catch(err => {
        let errorMessage = "Problem with server, sorry :("
        if (err.response) {
          errorMessage = err.response.data.message
        }
        dispatch(signupFail(errorMessage))
      });

  };
}


