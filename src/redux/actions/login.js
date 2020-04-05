import { LOGIN_USER_LOADING, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from './action-types';

export function loginUserLoading() {
    return {
        type: LOGIN_USER_LOADING
    }
}

//userData is the user information returned by spotify api
export function loginUserSuccess(userData) {
    return {
        type: LOGIN_USER_SUCCESS,
        userData
    }
}

export function loginUserError(err) {
    return {
        type: LOGIN_USER_ERROR,
        err
    }
}