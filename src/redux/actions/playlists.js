import { GET_PLAYLISTDATA_LOADING, GET_PLAYLISTDATA_SUCCESS, GET_PLAYLISTDATA_ERROR, 
    CREATE_PLAYLIST_LOADING, CREATE_PLAYLIST_SUCCESS, CREATE_PLAYLIST_ERROR, SET_ACTIVE_PLAYLIST } from './action-types';

export function loadPlaylistsLoading() {
  return {
    type: GET_PLAYLISTDATA_LOADING,
  };
}

// Playlists_data is the list of playlists returned by spotify api
export function loadPlaylistsSuccess(playlists) {
  return {
    type: GET_PLAYLISTDATA_SUCCESS,
    playlists,
  };
}

export function loadPlaylistsError(err) {
    return {
        type: GET_PLAYLISTDATA_ERROR,
        err
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export function createPlaylistLoading() {
    return {
        type: CREATE_PLAYLIST_LOADING
    }
}

//playlist is the new playlist returned by spotify api
export function createPlaylistSuccess(playlist) {
    return {
        type: CREATE_PLAYLIST_SUCCESS,
        playlist
    }
}

export function createPlaylistError(err) {
    return {
        type: CREATE_PLAYLIST_ERROR,
        err
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export function setActivePlaylist(playlist) {
    return {
        type: SET_ACTIVE_PLAYLIST,
        playlist
    }
}
