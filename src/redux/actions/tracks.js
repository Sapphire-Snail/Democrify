import {
    GET_PLAYLISTTRACKS_LOADING, GET_PLAYLISTTRACKS_SUCCESS, GET_PLAYLISTTRACKS_ERROR, 
  } from './action-types';

  export function getPlaylistTracksLoading() {
    return {
      type: GET_PLAYLISTTRACKS_LOADING,
    };
  }
  
  // userData is the user information returned by spotify api
  export function getPlaylistTracksSuccess(tracks) {
    return {
      type: GET_PLAYLISTTRACKS_SUCCESS,
      tracks,
    };
  }
  
  export function getPlaylistTracksError(err) {
    return {
      type: GET_PLAYLISTTRACKS_ERROR,
      err,
    };
  }