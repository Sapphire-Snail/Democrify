import React, { Component } from "react";
import { clientId, redirectUri, scopes } from "./config";
import logo from "./logo.svg";
import "./App.css";
var SpotifyWebApi = require('spotify-web-api-node');

//Create spotify api (needed to create authorization URL)
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: '3fbb80a0fa384eab8e096c6a96582cc6',
  redirectUri: redirectUri
});
// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes) + "&show_dialog=true";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn : "" };
    this.callLogin = this.callLogin.bind(this);
  }

  //Called on click of login button
  callLogin() {
    var popup = window.open(
      authorizeURL,
      'Login with Spotify',
      'width=600,height=800'
    )
    //Create callback function to be called 
    window.spotifyCallback = (payload) => { 
      //Close popup and tell server to log in
      popup.close();
      fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code: payload
        })
      })
      .then(
        res => res.json())
        .then(json => console.log(json));
    }
  }

  componentDidMount() {
    //Retrieve auth code from URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    //If code exists i.e if this component is within the popup, call the previous callback function to close popup
    if (code) {
      window.opener.spotifyCallback(code);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          Democrify up in this bitch.
          </p>
          
          <button
            className="btn btn--loginApp-link"
            onClick={this.callLogin}
          >
            Login to Spotify
          </button>

          <h1> Logged in?: {this.state.loggedIn} </h1>
        </header>
      </div>
    );
  }
}

export default App;

