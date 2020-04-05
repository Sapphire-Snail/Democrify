import { LOGIN_USER_LOADING, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../actions/action-types';

export default function login(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {

        case LOGIN_USER_LOADING:
            return login_loginLoading(state, action);

        case LOGIN_USER_SUCCESS:
            return login_loginSuccess(state, action);

        case LOGIN_USER_ERROR:
            return login_loginError(state, action);

        default:
            return state;
    }
}

function login_loginLoading(state, action) {
    return state;
}

//Get data returned from the server and return it as the new state for user data
function login_loginSuccess(state, action) {
    return action.userData.data.body;
}

//TODO: Set some state to indicate error
function login_loginError(state, action) {
    return state;
}