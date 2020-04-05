import { loadPlaylistsLoading, loadPlaylistsSuccess, loadPlaylistsError, getUserLoading, getUserSuccess, getUserError } from '..';
import Api from '../../../api';

export function loadPlaylists() {
    return dispatch => {
        // First, dispatch the LOAD_PLAYLISTS_LOADING action, allowing the rest of our app to detect when
        // we've started loading playlists.
        dispatch(loadPlaylistsLoading());

        // Now, start loading the todos.
        Api.getPlaylists()
            .then(

                // If the todos were loaded successfully, dispatch the LOAD_PLAYLISTS_SUCCESS action allowing the playlists to be added to the store
                playlists => dispatch(loadPlaylistsSuccess(playlists)),

                // If there was an error loading todos, dispatch the LOAD_PLAYLISTS_ERROR action providing details of the error
                error => dispatch(loadPlaylistsError(error.message || "Unexpected error!")));

    }
}

export function loadUser() {
    return dispatch => {
        dispatch(getUserLoading());

        Api.login()
            .then(
                events => dispatch(getUserSuccess(events)),

                error => dispatch(getUserError(error.message || "Unexpected error!")));

    }
}