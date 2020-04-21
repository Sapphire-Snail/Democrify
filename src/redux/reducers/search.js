import {
    SEARCH_ERROR,
    SEARCH_LOADING,
    SEARCH_SUCCESS
  } from '../actions/action-types';

export default function user(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {
        case SEARCH_LOADING:
            return searchLoading(state, action);

        case SEARCH_SUCCESS:
            return searchSuccess(state, action);

        case SEARCH_ERROR:
            return searchError(state, action);     

        default:
        return state;
    }
}

function searchLoading(state, action) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

// Get data returned from the server and return it as the new state for user data
function searchSuccess(state, action) {
    return {
      ...state,
      loading: false,
      searchResult: action.searchResult,
    };
}

function searchError(state, action) {
    return {
        ...state,
        loading: false,
        error: action.err,
    };
}