import { GET_USER_LOADING, GET_USER_SUCCESS, GET_USER_ERROR } from '../actions/action-types';

export default function login(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {

        case GET_USER_LOADING:
            return user_getUserLoading(state, action);

        case GET_USER_SUCCESS:
            return user_getUserSuccess(state, action);

        case GET_USER_ERROR:
            return user_getUserError(state, action);

        default:
            return state;
    }
}

function user_getUserLoading(state, action) {
    return state;
}

//Get data returned from the server and return it as the new state for user data
function user_getUserSuccess(state, action) {
    return action.userData.data.body;
}

//TODO: Set some state to indicate error
function user_getUserError(state, action) {
    return state;
}