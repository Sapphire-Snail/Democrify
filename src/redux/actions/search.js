import {
    SEARCH_LOADING,
    SEARCH_SUCCESS,
    SEARCH_ERROR
  } from './action-types';

export function searchLoading() {
    return {
        type: SEARCH_LOADING
    };
}

export function searchSuccess(searchResult) {
    return {
        type: SEARCH_SUCCESS,
        searchResult
    };
}

export function searchError(err) {
    return {
        type: SEARCH_ERROR,
        err
    };
}