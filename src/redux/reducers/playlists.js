import { GET_PLAYLISTDATA_LOADING, GET_PLAYLISTDATA_SUCCESS, GET_PLAYLISTDATA_ERROR, CREATE_PLAYLIST_LOADING, CREATE_PLAYLIST_SUCCESS, CREATE_PLAYLIST_ERROR } from '../actions/action-types';

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
    data: action.playlists.data.body,
  };
}

function playlists_LoadPlaylistsError(state, action) {
    return {
        ...state,
        loading: false,
        error: action.playlists.error
      };
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function playlists_CreatePlaylistLoading(state, action) {
    return {
        ...state,
        loading: true,
        error: null
      };
}

//Get new playlist returned by server and return existing playlists PLUS the new one we just made 
function playlists_CreatePlaylistSuccess(state, action) {
    //Add new playlist to our array
    state.data.items.unshift(action.playlist.data.body);
    console.log('Successfully created playlist');
    return {
        ...state,
        loading: false,
        error: null
      };
}

function playlists_CreatePlaylistError(state, action) {
    console.log(action);
    return {
        ...state,
        loading: false,
        error: action.playlist.error
      };
}
