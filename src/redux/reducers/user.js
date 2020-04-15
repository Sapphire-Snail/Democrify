/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import {
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  SET_LOGGEDIN_LOADING,
  SET_LOGGEDIN_SUCCESS,
  SET_LOGGEDIN_ERROR,
  SET_LOGGEDOUT_LOADING,
  SET_LOGGEDOUT_SUCCESS,
  SET_LOGGEDOUT_ERROR
} from '../actions/action-types';

export default function user(state = [], action) {
  // Perform different things based on the type of action
  switch (action.type) {
    case GET_USER_LOADING:
      return user_getUserLoading(state, action);

    case GET_USER_SUCCESS:
      return user_getUserSuccess(state, action);

    case GET_USER_ERROR:
      return user_getUserError(state, action);

    case SET_LOGGEDIN_LOADING:
      return user_setLoggedInLoading(state, action);

    case SET_LOGGEDIN_SUCCESS:
      return user_setLoggedInSuccess(state, action);

    case SET_LOGGEDIN_ERROR:
      return user_setLoggedInError(state, action);

    case SET_LOGGEDOUT_LOADING:
      return user_setLoggedOutLoading(state, action);

    case SET_LOGGEDOUT_SUCCESS:
      return user_setLoggedOutSuccess(state, action);

    case SET_LOGGEDOUT_ERROR:
      return user_setLoggedOutError(state, action);

    default:
      return state;
  }
}

/* ------------------------------------------------------GET USER------*/
function user_getUserLoading(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

// Get data returned from the server and return it as the new state for user data
function user_getUserSuccess(state, action) {
  return {
    ...state,
    loading: false,
    data: action.userData.data.body,
  };
}

function user_getUserError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
}

/* ------------------------------------------------------SET LOGGEDIN------*/
function user_setLoggedInLoading(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
    loggedIn: false,
  };
}

// Get data returned from the server and return it as the new state for user data
function user_setLoggedInSuccess(state, action) {
  return {
    ...state,
    loading: true, // Keep this as true as once we've got the tokens (set user as logged in) then we still have to get the user data
    loggedIn: action.res.status === 200,
  };
}

function user_setLoggedInError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
}

/* ------------------------------------------------------SET LOGGEDOUT------*/
function user_setLoggedOutLoading(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
    loggedIn: false,
  };
}

// Get data returned from the server and return it as the new state for user data
function user_setLoggedOutSuccess(state, action) {
  return {
    loading: false, // Keep this as true as once we've got the tokens (set user as logged in) then we still have to get the user data
    loggedIn: false
  };
}

function user_setLoggedOutError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
}
