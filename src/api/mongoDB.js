import axios from 'axios';

export function createSession(playlistURI, hostID) {
    return axios({
        method: "post",
        url: "/api/playlistSession/",
        timeout: 10000,
        data: {
            hostID: hostID,
            playlistURI: playlistURI
        }
    });
}

export function getSession() {
    return axios({
        method: "post",
        url: "/api/playlistSession/",
        timeout: 10000,
        data: {
            hostID: hostID,
            playlistURI: playlistURI
        }
    });
}