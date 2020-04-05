import axios from "axios";
//NOT YET BEING USED
export function login(code) {
    return await axios({
        method: "post",
        url: "/api/login",
        timeout: 8000,
        data: {
            code: code
        }
    }).then(axios.get("/api/me"));
}