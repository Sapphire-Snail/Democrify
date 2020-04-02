import React, { Component } from "react";
import { clientId, redirectUri, scopes } from "./config";
import logo from "./logo.svg";
import axios from "axios";
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
  async callLogin() {
    var URLres = await Promise.all([axios.get("/api/getLoginURL")]);
    console.log(URLres[0].data);

    var popup = window.open(
      URLres[0].data,
      'Login with Spotify',
      'width=800,height=900'
    )
    //Create callback function to be called 
    window.spotifyCallback = async (payload) => { 
      //Close popup and tell server to log in
      popup.close();

      await Promise.all([
        axios({
          method: "post",
          url: "/api/login",
          timeout: 5000,
          data: {
            code: payload
          }
        })]);
      const response = await axios.get("/api/me");
      console.log(response.data.body);
      this.setState({loggedIn: response.data.body.display_name});
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

