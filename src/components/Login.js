import React, { Component } from 'react';
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { Spinner } from "./Spinner"


class Login extends Component {
    constructor(props) {
        super(props);
        this.callLogin = this.callLogin.bind(this);
    }

    //Called on click of login button
    async callLogin() {
        //Get auth URL from backend
        var URLres = await axios.get("/api/getLoginURL");

        //Open login popup
        var popup = window.open(
        URLres.data,
        'Login with Spotify',
        'width=800, height=900'
        )

        //Create callback function to be called when user clicks login
        window.spotifyCallback = async (payload) => { 
            //Close popup and tell server to log in
            popup.close();
            await axios({
                method: "post",
                url: "/api/login",
                timeout: 8000,
                data: {
                    code: payload
                }
            });
            const response = await trackPromise(axios.get("/api/me"));
            //console.log(response.data.body);
            this.props.handleLogin(response.data.body);
        }
    }

    componentDidMount() {
        //Retrieve auth code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        //If code exists i.e if this component is within the popup, call the previous callback function to close popup
        if (code) {
            window.opener.spotifyCallback(code);
        }
    }

    render() {
        return(
            <div>
                {[
                    <button key={0} className="btn btn--loginApp-link" onClick={this.callLogin}>
                        Login to Spotify
                    </button>,  
                    <Spinner key={1} />
                ]}
            </div>
        );
    }
}

export default Login;