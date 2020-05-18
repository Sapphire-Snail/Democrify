/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import {
    CREATE_SESSION_LOADING,
    CREATE_SESSION_SUCCESS,
    CREATE_SESSION_ERROR,
    GET_SESSION_LOADING,
    GET_SESSION_SUCCESS,
    GET_SESSION_ERROR
  } from '../actions/action-types';
  
  export default function user(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {
      case CREATE_SESSION_LOADING:
        return session_createSessionLoading(state, action);
  
      case CREATE_SESSION_SUCCESS:
        return session_createSessionSuccess(state, action);
  
      case CREATE_SESSION_ERROR:
        return session_createSessionError(state, action);
      
      case GET_SESSION_LOADING:
        return session_getSessionLoading(state, action);
  
      case GET_SESSION_SUCCESS:
        return session_getSessionSuccess(state, action);
  
      case GET_SESSION_ERROR:
        return session_getSessionError(state, action);
  
      default:
        return state;
    }
  }
  
  /* ------------------------------------------------------CREATE SESSION------*/
  function session_createSessionLoading(state, action) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  
  // Get data returned from the server and return it as the new state for user data
  function session_createSessionSuccess(state, action) {
    return {
      ...state,
      loading: false,
      hosted_session: action.session,
    };
  }
  
  function session_createSessionError(state, action) {
    return {
      ...state,
      loading: false,
      error: action.err,
    };
  }

  /* ------------------------------------------------------GET SESSION------*/
  function session_getSessionLoading(state, action) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  
  // Get data returned from the server and return it as the new state for user data
  function session_getSessionSuccess(state, action) {
    return {
      ...state,
      loading: false,
      connected_session: action.session,
    };
  }
  
  function session_getSessionError(state, action) {
    return {
      ...state,
      loading: false,
      error: action.err,
    };
  }