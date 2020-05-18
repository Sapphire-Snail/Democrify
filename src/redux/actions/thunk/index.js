import {
  loadPlaylistsLoading,
  loadPlaylistsSuccess,
  loadPlaylistsError,
  createPlaylistLoading,
  createPlaylistSuccess,
  createPlaylistError,
  getUserLoading,
  getUserSuccess,
  getUserError,
  setLoggedIn,
  setLoggedOut,
  setActivePlaylist,
  getPlaylistTracksLoading,
  getPlaylistTracksSuccess,
  getPlaylistTracksError,
  setDeviceId,
  searchLoading,
  searchSuccess,
  searchError,
  addSongLoading,
  addSongError,
  addSongSuccess,
  setPlayState,
  createSessionLoading,
  createSessionSuccess,
  createSessionError,
  getSessionLoading,
  getSessionSuccess,
  getSessionError,
  getPlaylistLoading,
  getPlaylistSuccess,
  getPlaylistError,
  setCollaborativeLoading,
  setCollaborativeSuccess,
  setCollaborativeError,
} from "..";
import * as spotify from "../../../SpotifyFunctions.js";
import Api from "../../../api";

export function loadPlaylists() {
  return (dispatch) => {
    // First, dispatch the LOAD_PLAYLISTS_LOADING action, allowing the rest of our app to detect when
    // we've started loading playlists.
    dispatch(loadPlaylistsLoading());

    spotify.getUserPlaylists().then(
      // If the todos were loaded successfully, dispatch the LOAD_PLAYLISTS_SUCCESS action allowing the playlists to be added to the store
      (playlists) => dispatch(loadPlaylistsSuccess(playlists)),

      // If there was an error loading todos, dispatch the LOAD_PLAYLISTS_ERROR action providing details of the error
      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          loadPlaylistsError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}

export function loadUser() {
  return (dispatch) => {
    dispatch(getUserLoading()); //Dispatch loading action
    spotify
      .getUserInfo() //Dispatch get user info function
      .then(
        (userData) => dispatch(getUserSuccess(userData)),

        (error) => {
          var err = JSON.parse(error.response);
          dispatch(
            getUserError(
              err.error.status + " " + err.error.message || "Unexpected error!"
            )
          );
        }
      );
  };
}

export function login(accessToken) {
  return (dispatch) => {
    spotify.setAccessToken(accessToken); //Set access token in spotify api
    dispatch(setLoggedIn(accessToken)); //Set logged in to be true
    dispatch(loadUser()); //Start loading the user for when we redirect to /me
  };
}

export function logout() {
  return (dispatch) => {
    spotify.setAccessToken(null); //Set access token in spotify api
    dispatch(setLoggedOut()); //Set logged out to be true and remove access token
  };
}

export function createPlaylist(userId, playlist_name) {
  return (dispatch) => {
    dispatch(createPlaylistLoading());
    spotify.createPlaylist(userId, playlist_name).then(
      (playlist) => dispatch(createPlaylistSuccess(playlist)),
      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          createPlaylistError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}

export function setPlaylist(playlist) {
  return (dispatch) => {
    dispatch(setActivePlaylist(playlist));
  };
}

export function getPlaylistTracks(playlistId) {
  return (dispatch) => {
    dispatch(getPlaylistTracksLoading());
    spotify.getPlaylistTracks(playlistId).then(
      (tracks) => dispatch(getPlaylistTracksSuccess(tracks)),

      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          getPlaylistTracksError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}

export function setDeviceID(deviceId) {
  return (dispatch) => {
    dispatch(setDeviceId(deviceId));
  };
}

export function searchSong(keyword) {
  return (dispatch) => {
    dispatch(searchLoading());
    spotify.searchSong(keyword).then(
      (tracks) => dispatch(searchSuccess(tracks)),

      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          searchError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}

export function addSong(activePlaylistID, songURI) {
  return (dispatch) => {
    dispatch(addSongLoading());
    spotify.addSong(activePlaylistID, songURI).then(
      () => dispatch(addSongSuccess()),

      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          addSongError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}

export function updatePlayState(state) {
  return (dispatch) => {
    dispatch(setPlayState(state));
  };
}

export function createPlaylistSession(playlistURI, hostID) {
  return (dispatch) => {
    dispatch(createSessionLoading());
    // Then call the API function with the given payload
    Api.createSession(playlistURI, hostID).then(
      (session) => dispatch(createSessionSuccess(session)),

      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          createSessionError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}

//Get session from db, then corresponding playlist object from spotify
export function getSession(code) {
  return (dispatch) => {
    dispatch(getSessionLoading());
    // Then call the API function with the given payload
    Api.getSessionPlaylist(code).then(
      (session) => {
        dispatch(getPlaylistLoading());
        // Then call the API function with the given payload
        spotify.getPlaylist(session.data.playlistURI).then(
          (playlist) => {
            dispatch(getPlaylistSuccess(playlist));
            dispatch(getSessionSuccess(session));
          },

          (error) => {
            var err = JSON.parse(error.response);
            dispatch(
              getPlaylistError(
                err.error.status + " " + err.error.message ||
                  "Unexpected error!"
              )
            );
          }
        );
      },

      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          getSessionError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}

export function setCollaborative(bool, playlist_id) {
  return (dispatch) => {
    dispatch(setCollaborativeLoading());
    // Then call the API function with the given payload
    spotify.makeCollaborative(bool, playlist_id).then(
      (res) => dispatch(setCollaborativeSuccess(res)),

      (error) => {
        var err = JSON.parse(error.response);
        dispatch(
          setCollaborativeError(
            err.error.status + " " + err.error.message || "Unexpected error!"
          )
        );
      }
    );
  };
}
