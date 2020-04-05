import { GET_PLAYLISTDATA_LOADING, GET_PLAYLISTDATA_SUCCESS, GET_PLAYLISTDATA_ERROR } from './action-types';

export function loadPlaylistsLoading() {
    return {
        type: GET_PLAYLISTDATA_LOADING
    }
}

//Playlists_data is the list of playlists returned by spotify api
export function loadPlaylistsSuccess(playlists) {
    return {
        type: GET_PLAYLISTDATA_SUCCESS,
        playlists
    }
}

export function loadPlaylistsError(err) {
    return {
        type: GET_PLAYLISTDATA_ERROR,
        err
    }
}