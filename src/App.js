import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import * as spotify from "./SpotifyFunctions.js";

//Components
import LoginPage from "./components/LoginPage";
import Callback from "./Callback";
import UserInfo from "./components/UserInfo";
import PlaylistsPage from "./components/PlaylistsPage";
import TracksPage from "./components/TracksPage";
import WebPlayer from "./components/WebPlayer";
// import { Container } from "reactstrap";
import WelcomeScreen from "./components/WelcomeScreen";

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends Component {
  render() {
    //When app is refreshed, reload access token from persist (will update)
    spotify.setAccessToken(this.props.accessToken);

    return (
      <Router>
        <div className="App">
          <header>
            <img className="App-logo" src={require("./assets/logo.svg")} />
            <h2 className="slogan">Music for the people</h2>
            { this.props.loggedIn && <WebPlayer />} {/* At the moment the whole app gets a web player, but in the future only load if they are hosting */}
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/callback">
                <Callback />
              </Route>
              <Route path="/me">
                <UserInfo />
                <WelcomeScreen />
              </Route>
              <Route path="/playlists">
                <UserInfo />
                <PlaylistsPage />
              </Route>
              <Route path="/playlist">
                <UserInfo />
                <TracksPage />
              </Route>
              <Route path="*">
                <p>404 Not Found!!</p>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    accessToken: state.user.accessToken,
    loggedIn: state.user.loggedIn
  };
}
// Connect to redux store
export default connect(mapStateToProps)(App);
