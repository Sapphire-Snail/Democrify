import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class LoginPage extends Component {

    //Called on click of login button
    async callLogin() {
        //Get auth URL from backend (this should probably all be moved to redux but hey)
        var URLres = await axios.get("/api/getLoginURL");

        //Open login popup
        window.location = URLres.data;
    }

    render() {
        //If we're already logged in, send them over to /me
        if(this.props.loggedIn) {
            return <Redirect to='/me'/>
        }
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

//State is entire state tree
function mapStateToProps(state) {
    return {
        loggedIn: state.user ? state.user.loggedIn : false
    };
}
//Connect to redux store
export default connect(mapStateToProps)(LoginPage);