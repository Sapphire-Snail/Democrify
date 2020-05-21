import {
    CREATE_SESSION_LOADING,
    CREATE_SESSION_SUCCESS,
    CREATE_SESSION_ERROR,
    GET_SESSION_LOADING,
    GET_SESSION_SUCCESS,
    GET_SESSION_ERROR,
    GET_ALLSESSIONS
  } from './action-types';

export function createSessionLoading() {
    return {
        type: CREATE_SESSION_LOADING
    };
}

export function createSessionSuccess(session) {
    return {
        type: CREATE_SESSION_SUCCESS,
        session
    };
}

export function createSessionError(err) {
    return {
        type: CREATE_SESSION_ERROR,
        err
    };
}

export function getSessionLoading() {
    return {
        type: GET_SESSION_LOADING
    };
}

export function getSessionSuccess(session) {
    return {
        type: GET_SESSION_SUCCESS,
        session
    };
}

export function getSessionError(err) {
    return {
        type: GET_SESSION_ERROR,
        err
    };
}


