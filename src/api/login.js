import axios from "axios";
//NOT YET BEING USED
export function login() {
    return axios.get("/api/me")
}