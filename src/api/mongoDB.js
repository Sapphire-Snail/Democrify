import axios from 'axios';
import { nanoid } from 'nanoid';

export function createSession(playlistURI, hostID) {
    return axios({
        method: "post",
        url: "/api/playlistSession/",
        timeout: 10000,
        data: {
            hostID: hostID,
            playlistURI: playlistURI,
            joinCode: nanoid(4),
        }
    });
}

export async function getSessionPlaylist(sessionCode) {
    return await axios({
        method: "get",
        url: "/api/playlistSession/" + sessionCode,
        timeout: 10000
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
        timeout: 10000
    });
}