import {
  GET_USER_LOADING, GET_USER_SUCCESS, GET_USER_ERROR, SET_LOGGEDIN_LOADING, SET_LOGGEDIN_SUCCESS, SET_LOGGEDIN_ERROR,
  SET_LOGGEDOUT_LOADING, SET_LOGGEDOUT_SUCCESS, SET_LOGGEDOUT_ERROR
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
export function setLoggedInLoading() {
  return {
    type: SET_LOGGEDIN_LOADING,
  };
}

// res is the info returned by spotify token
export function setLoggedInSuccess(res) {
  return {
    type: SET_LOGGEDIN_SUCCESS,
    res,
  };
}

export function setLoggedInError(err) {
  return {
    type: SET_LOGGEDIN_ERROR,
    err,
  };
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Logout
export function setLoggedOutLoading() {
  return {
    type: SET_LOGGEDOUT_LOADING,
  };
}

// res is the info returned by spotify token
export function setLoggedOutSuccess(res) {
  return {
    type: SET_LOGGEDOUT_SUCCESS,
    res,
  };
}

export function setLoggedOutError(err) {
  return {
    type: SET_LOGGEDOUT_ERROR,
    err,
  };
}
