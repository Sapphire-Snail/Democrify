import {
  GET_USER_LOADING, GET_USER_SUCCESS, GET_USER_ERROR, 
  SET_LOGGEDIN,
} from './action-types';

export function getUserLoading() {
  return {
    type: GET_USER_LOADING,
  };
}

// userData is the user information returned by spotify api
export function getUserSuccess(userData) {
  return {
    type: GET_USER_SUCCESS,
    userData,
  };
}

export function getUserError(err) {
  return {
    type: GET_USER_ERROR,
    err,
  };
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Login
export function setLoggedIn() {
  return {
    type: SET_LOGGEDIN,
  };
}
