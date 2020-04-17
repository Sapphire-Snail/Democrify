/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import {
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  SET_LOGGEDIN,
  SET_LOGGEDOUT
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

    case SET_LOGGEDIN:
      return user_setLoggedIn(state, action);

    case SET_LOGGEDOUT:
      return user_setLoggedOut(state, action);

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
    data: action.userData,
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
function user_setLoggedIn(state, action) {
  return {
    ...state,
    error: null,
    loggedIn: true,
    accessToken: action.token
  };
}

function user_setLoggedOut(state, action) {
  return {
    error: null,
    loggedIn: false,
    accessToken: null
  };
}
