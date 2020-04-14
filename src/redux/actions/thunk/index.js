import { loadPlaylistsLoading, loadPlaylistsSuccess, loadPlaylistsError, createPlaylistLoading, createPlaylistSuccess, createPlaylistError,
    getUserLoading, getUserSuccess, getUserError, setLoggedInLoading, setLoggedInSuccess, setLoggedInError } from '..';
import Api from '../../../api';

export function loadPlaylists(userId) {
  return (dispatch) => {
    // First, dispatch the LOAD_PLAYLISTS_LOADING action, allowing the rest of our app to detect when
    // we've started loading playlists.
    dispatch(loadPlaylistsLoading());

    // Now, start loading the todos.
    Api.getPlaylists(userId)
      .then(
        // If the todos were loaded successfully, dispatch the LOAD_PLAYLISTS_SUCCESS action allowing the playlists to be added to the store
        (playlists) => dispatch(loadPlaylistsSuccess(playlists)),

        // If there was an error loading todos, dispatch the LOAD_PLAYLISTS_ERROR action providing details of the error
        (error) => dispatch(loadPlaylistsError(error.message || 'Unexpected error!')),
      );
  };
}

export function loadUser() {
  return (dispatch) => {
    dispatch(getUserLoading());

    Api.getUser()
      .then(
        (userData) => dispatch(getUserSuccess(userData)),

        error => dispatch(getUserError(error.message || "Unexpected error!")));
    }
}

export function login(code) {
    return dispatch => {
        dispatch(setLoggedInLoading());

        Api.getUserTokens(code)
            .then(
                res => {
                    dispatch(setLoggedInSuccess(res));
                    dispatch(loadUser());
                },

                error => {
                    dispatch(setLoggedInError(error.message || "Unexpected Error"));
                });
    }
}

export function createPlaylist(userId, playlist_name) {
    return dispatch => {
        dispatch(createPlaylistLoading());
        
        Api.createPlaylist(userId, playlist_name)
            .then(
                userData => dispatch(createPlaylistSuccess(userData)),

                error => dispatch(createPlaylistError(error.message || "Unexpected error!")));
    }
}
