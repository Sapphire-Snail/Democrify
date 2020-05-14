import axios from 'axios';
import { nanoid } from 'nanoid'

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