import {
    SEARCH_LOADING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    ADD_SONG_ERROR,
    ADD_SONG_SUCCESS,
    ADD_SONG_LOADING,
    REMOVE_SONG_ERROR,
    REMOVE_SONG_SUCCESS,
    REMOVE_SONG_LOADING
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

export function addSongLoading() {
    return {
        type: ADD_SONG_LOADING
    };
}

export function addSongSuccess() {
    return {
        type: ADD_SONG_SUCCESS,
    };
}

export function addSongError(err) {
    return {
        type: ADD_SONG_ERROR,
        err
    };
}

export function removeSongLoading() {
    return {
        type: REMOVE_SONG_LOADING
    };
}

export function removeSongSuccess() {
    return {
        type: REMOVE_SONG_SUCCESS,
        removed: true
    };
}

export function removeSongError(err) {
    return {
        type: REMOVE_SONG_ERROR,
        err
    };
}



