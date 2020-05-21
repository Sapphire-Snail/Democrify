import {
  GET_PLAYLISTDATA_LOADING,
  GET_PLAYLISTDATA_SUCCESS,
  GET_PLAYLISTDATA_ERROR,
  CREATE_PLAYLIST_LOADING,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_ERROR,
  SET_ACTIVE_PLAYLIST,
  GET_PLAYLIST_LOADING,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_ERROR,
  SET_COLLABORATIVE_LOADING,
  SET_COLLABORATIVE_SUCCESS,
  SET_COLLABORATIVE_ERROR,
  GET_ALLSESSIONS,
} from "../actions/action-types";

/**
 * This function handles modifications to the "playlists" property of the overall state.
 *
 * @param state the current playlists data. Will be set to [] if it doesn't yet exist.
 * @param action the modification to make to the array
 * @returns the new playlists data
 */
export default function playlists(state = [], action) {
  // Perform different things based on the type of action
  switch (action.type) {
    case GET_PLAYLISTDATA_LOADING:
      return playlists_LoadPlaylistsLoading(state, action);

    case GET_PLAYLISTDATA_SUCCESS:
      return playlists_LoadPlaylistsSuccess(state, action);

    case GET_PLAYLISTDATA_ERROR:
      return playlists_LoadPlaylistsError(state, action);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    case CREATE_PLAYLIST_LOADING:
      return playlists_CreatePlaylistLoading(state, action);

    case CREATE_PLAYLIST_SUCCESS:
      return playlists_CreatePlaylistSuccess(state, action);

    case CREATE_PLAYLIST_ERROR:
      return playlists_CreatePlaylistError(state, action);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    case SET_ACTIVE_PLAYLIST:
      return playlist_SetActivePlaylist(state, action);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    case GET_PLAYLIST_LOADING:
      return playlists_getPlaylistLoading(state, action);

    case GET_PLAYLIST_SUCCESS:
      return playlists_getPlaylistSuccess(state, action);

    case GET_PLAYLIST_ERROR:
      return playlists_getPlaylistError(state, action);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    case SET_COLLABORATIVE_LOADING:
      return playlists_setCollaborativeLoading(state, action);

    case SET_COLLABORATIVE_SUCCESS:
      return playlists_setCollaborativeSuccess(state, action);

    case SET_COLLABORATIVE_ERROR:
      return playlists_setCollaborativeError(state, action);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    case GET_ALLSESSIONS:
      return playlist_allSessions(state, action);

    default:
      return state;
  }
}

/**
 * In this function, we could, if we wanted, set some kind of state to signify that playlists are currently being
 * loaded from the backend. For example, set a flag that would signal the UI to display a "loading..." bar.
 */
function playlists_LoadPlaylistsLoading(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

// Get data returned from the server and return it as the new state for playlists
function playlists_LoadPlaylistsSuccess(state, action) {
  return {
    ...state,
    loading: false,
    data: action.playlists,
  };
}

function playlists_LoadPlaylistsError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function playlists_CreatePlaylistLoading(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

//Get new playlist returned by server and return existing playlists PLUS the new one we just made
function playlists_CreatePlaylistSuccess(state, action) {
  //Add new playlist to our array
  state.data.items.unshift(action.playlist);
  console.log("Successfully created playlist");
  return {
    ...state,
    loading: false,
    error: null,
  };
}

function playlists_CreatePlaylistError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function playlist_SetActivePlaylist(state, action) {
  return {
    ...state,
    active_playlist: action.playlist,
  };
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function playlists_getPlaylistLoading(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

function playlists_getPlaylistSuccess(state, action) {
  return {
    ...state,
    loading: false,
    error: null,
    active_playlist: action.playlist, //This is a bit of a hack to avoid having to call set active playlist later, just note getPlaylist stores it in active_playlist
  };
}

function playlists_getPlaylistError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function playlists_setCollaborativeLoading(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

function playlists_setCollaborativeSuccess(state, action) {
  return {
    ...state,
    loading: false,
    error: null,
  };
}

function playlists_setCollaborativeError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
}

/* ------------------------------------------------------GET ALL SESSIONS------*/
function playlist_allSessions(state, action) {
  //console.log(action.state.playlists.data.items);
  var playlists = action.state.playlists.data.items;
  var sessions = action.sessions.data;
  const merged = playlists.map((playlist) => {
    const sesh = sessions.find((inc) => inc.playlistURI === playlist.id);
    if(sesh) {
      const play = playlists.find((inc) => inc.id === sesh.playlistURI);
      play["session"] = sesh;
      return play
    }
    return playlist;
  });
  playlists = merged;

  return {
    ...state,
    playlists
  };
}
