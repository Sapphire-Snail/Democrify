import axios from "axios";

export function getPlaylists() {
    return axios({
        method: "post",
        url: "/api/getUserPlaylists",
        timeout: 8000,
        data: {
            userId: "rowanhart22",
        }
    });
}