import React, { Component } from "react";
import { clientId, redirectUri, scopes } from "./config";
//import hash from "./hash";
import logo from "./logo.svg";
import "./App.css";
var SpotifyWebApi = require('spotify-web-api-node');

//Create spotify api
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: '3fbb80a0fa384eab8e096c6a96582cc6',
  redirectUri: redirectUri
});
// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
//console.log(authorizeURL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn : "" };
  }

  callLogin() {
    fetch("http://localhost:5000/api/login")
    .then(res => res.text())
    .then(res => this.setState({ loggedIn : res}))
    .catch(err => err);
  }

  componentDidMount() {
    this.callLogin();
    //Get code
    //const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString);
    //const code = urlParams.get('code');
    // Retrieve an access token and a refresh token
    //console.log('CODE IS: ' + code);
    // spotifyApi.authorizationCodeGrant(code).then(
    //   function(data) {
    //     console.log('The token expires in ' + data.body['expires_in']);
    //     console.log('The access token is ' + data.body['access_token']);
    //     console.log('The refresh token is ' + data.body['refresh_token']);

    //     // Set the access token on the API object to use it in later calls
    //     spotifyApi.setAccessToken(data.body['access_token']);
    //     spotifyApi.setRefreshToken(data.body['refresh_token']);
    //   },
    //   function(err) {
    //     console.log('Something went wrong!', err);
    //   }
    // );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          Democrify up in this bitch.
          </p>
          
          <a
            className="btn btn--loginApp-link"
            //href={authorizeURL}
          >
            Login to Spotify
          </a>

          <h1> Logged in?: {this.state.loggedIn} </h1>
          {spotifyApi.getAccessToken() && (
            [
            <p> Access token: {spotifyApi.getAccessToken()}</p>,
            ]
          )}
        </header>
      </div>
    );
  }
}

export default App;
