import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import * as spotify from "./SpotifyFunctions.js";
import { Button } from "reactstrap";

//Components
import LoginPage from "./components/LoginPage";
import Callback from "./Callback";
import LoginBar from "./components/LoginBar";
import PlaylistsPage from "./components/PlaylistsPage";
import TracksPage from "./components/TracksPage";
import WebPlayer from "./components/WebPlayer";
import WelcomeScreen from "./components/WelcomeScreen";
import PlayerControls from "./components/PlayerControls";
import SessionPage from "./components/SessionPage";

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends Component {
  render() {
    //When app is refreshed, reload access token from persist
    spotify.setAccessToken(this.props.accessToken);

    return (
      <Router>
        <div className="App">
        <LoginBar />
          <header>
            <img
              className="App-logo"
              src={require("./assets/logo.svg")}
              alt="logo"
            />
            <h2 className="slogan">Music for the people</h2>
            {this.props.loggedIn && <WebPlayer />}{" "}
            {/* the whole app gets a web player */}
          </header>
          <main>
            <div>
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
                  <WelcomeScreen />
                </Route>
                <Route path="/playlists">
                  <PlaylistsPage />
                </Route>
                <Route path="/playlist">
                  <TracksPage />
                </Route>
                <Route path="/session">
                  <SessionPage />
                </Route>
                <Route path="*">
                  <p>404 Not Found!</p>
                  <Button color="primary" tag={Link} to={'/login'}> Back to safety! </Button>
                </Route>
              </Switch>
              <PlayerControls />
            </div>
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
    loggedIn: state.user.loggedIn,
  };
}
// Connect to redux store
export default connect(mapStateToProps)(App);
