import axios from "axios";
import { nanoid } from "nanoid";

export function createSession(playlistURI, hostID) {
  return axios({
    method: "post",
    url: "/api/playlistSession/",
    timeout: 10000,
    data: {
      hostID: hostID,
      playlistURI: playlistURI,
      joinCode: nanoid(4),
    },
  });
}

export async function getSessionPlaylist(sessionCode) {
  return await axios({
    method: "get",
    url: "/api/playlistSession/" + sessionCode,
    timeout: 10000,
  });
}

export function addSongToDB(sessionCode, trackToAdd, addedBy) {
    return axios({
        method: "PUT",
        url: "/api/playlistSession/" + sessionCode,
        timeout: 10000,
        data: {
            joinCode: sessionCode,
            trackToAdd: trackToAdd,
            addedBy: addedBy
        }
    });
}

export function removeSongFromDB(trackToRemoveURI, sessionCode) {
    return axios({
        method: "PUT",
        url: "/api/playlistSession/" + sessionCode,
        timeout: 10000,
        data: {
            joinCode: sessionCode,
            trackToRemoveURI: trackToRemoveURI,
        }
    });
}
export function getCodeFromPlaylist(hostID, playlistID) {
  return axios({
    method: "post",
    url: "/api/getSessionFromPlaylist/",
    data: {
      hostID: hostID,
      playlistID: playlistID,
    },
    timeout: 10000,
  });
}

export function getAllUserSessions(hostID) {
  return axios({
    method: "post",
    url: "/api/getAllUserSessions/",
    data: {
      hostID: hostID,
    },
    timeout: 10000,
  });
}
