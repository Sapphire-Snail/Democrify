import axios from "axios";

export function getPlaylists(userId) {
    return axios({
        method: "post",
        url: "/api/getUserPlaylists",
        timeout: 8000,
        data: {
            userId: userId,
        }
    });
}