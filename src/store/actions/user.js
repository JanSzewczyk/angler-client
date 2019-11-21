import axios from "../../axios";

import * as actionTypes from "./actionTypes";

export const userGetInfoStart = () => {
  return {
    type: actionTypes.USER_INFO_START
  };
};

export const userGetInfoSuccess = data => {
  return {
    type: actionTypes.USER_INFO_SUCCESS,
    info: data
  };
};

export const getUserInformation = (type, token) => {
  return dispatch => {
    dispatch(userGetInfoStart());

    let config = {
      headers: {
        Authorization: type + " " + token
      }
    };

    axios
      .get("/user", config)
      .then(res => {
        dispatch(userGetInfoSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
