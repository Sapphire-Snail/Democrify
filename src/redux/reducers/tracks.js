/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import {
    GET_PLAYLISTTRACKS_LOADING,
    GET_PLAYLISTTRACKS_SUCCESS,
    GET_PLAYLISTTRACKS_ERROR,
  } from '../actions/action-types';
  
  export default function user(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {
      case GET_PLAYLISTTRACKS_LOADING:
        return tracks_getPlaylistTracksLoading(state, action);
  
      case GET_PLAYLISTTRACKS_SUCCESS:
        return tracks_getPlaylistTracksSuccess(state, action);
  
      case GET_PLAYLISTTRACKS_ERROR:
        return tracks_getPlaylistTracksError(state, action);
  
      default:
        return state;
    }
  }
  
  /* ------------------------------------------------------GET USER------*/
  function tracks_getPlaylistTracksLoading(state, action) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  
  // Get data returned from the server and return it as the new state for user data
  function tracks_getPlaylistTracksSuccess(state, action) {
    return {
      ...state,
      loading: false,
      data: action.tracks,
    };
  }
  
  function tracks_getPlaylistTracksError(state, action) {
    return {
      ...state,
      loading: false,
      error: action.err,
    };
  }