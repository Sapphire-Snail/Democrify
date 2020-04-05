import React, { Component } from 'react';
import axios from "axios";

class LoginPage extends Component {

    //Called on click of login button
    async callLogin() {
        //Get auth URL from backend (this should probably all be moved to redux but hey)
        var URLres = await axios.get("/api/getLoginURL");

        //Open login popup
        window.location = URLres.data;
    }

    render() {
        return(
            <div>
                {[
                    <button key={0} className="btn btn--loginApp-link" onClick={this.callLogin}>
                        Login to Spotify
                    </button>,  
                ]}
            </div>
        );
    }
}

export default LoginPage