import { ADD_PLAYLISTDATA_LOADING, ADD_PLAYLISTDATA_SUCCESS, ADD_PLAYLISTDATA_ERROR } from './action-types';

export function loadPlaylistsLoading() {
    return {
        type: ADD_PLAYLISTDATA_LOADING
    }
}

//Playlists_data is the list of playlists returned by spotify api
export function loadPlaylistsSuccess(playlists) {
    return {
        type: ADD_PLAYLISTDATA_SUCCESS,
        playlists
    }
}

export function loadPlaylistsError(err) {
    return {
        type: ADD_PLAYLISTDATA_ERROR,
        err
    }
}