import axios from 'axios';

export function getPlaylists(userId) {

    return axios({
        method: "post",
        url: "/api/getUserPlaylists",
        timeout: 10000,
        data: {
            userId: userId,
        }
    });
}

export function createPlaylist(userId, playlist_name) {
    return axios({
        method: "post",
        url: "/api/createPlaylist",
        timeout: 10000,
        data: {
            userId: userId,
            name: playlist_name
        }
    });

}
