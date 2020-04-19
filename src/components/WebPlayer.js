import React, { Component } from "react";
import { connect } from "react-redux";
import { setDeviceID } from '../redux/actions/thunk';

//Code adapted from: https://glitch.com/edit/#!/spotify-web-playback-react?path=src/App.js:63:30
class WebPlayer extends Component {
  webPlaybackInstance = null

  //Make sure spotify is mounted correctly
  waitForSpotify() {
    return new Promise(resolve => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
      }
    });
  }

  //Set up basic player instance and error handling
  async setupWebPlaybackEvents() {
    let { Player } = window.Spotify;

    this.webPlaybackInstance = new Player({
      name: 'Democrify',
      getOAuthToken: cb => { cb(this.props.token); }
    });
    
    this.webPlaybackInstance.on("initialization_error", ({ message }) => {
      console.log('error' + message);
    });
    
    this.webPlaybackInstance.on("authentication_error", ({ message }) => {
      console.log('error' + message);
    });

    this.webPlaybackInstance.on("account_error", ({ message }) => {
      console.log('error' + message);
    });

    this.webPlaybackInstance.on("playback_error", ({ message }) => {
      console.log('error' + message);
    });

    this.webPlaybackInstance.on("player_state_changed", async state => {
      console.log('state changed', state);
    });

    this.webPlaybackInstance.on("ready", device_id => {
      console.log('ready with device: ', device_id.device_id);
      this.props.setDeviceID(device_id.device_id);
    });

    //Connect to the web player
    this.webPlaybackInstance.connect();
  }

  async componentDidMount() {
    // Wait for Spotify to load player
    await this.waitForSpotify();

    //Load web player
    await this.setupWebPlaybackEvents();
    
  }


  render() {
      return(
        <div/>
      )
  }
}


// State is entire state tree
function mapStateToProps(state) {
  return {
    token: state.user.accessToken,
    loggedIn: state.user.loggedIn
  };
}

const mapDispatchToProps = {
  setDeviceID,
}

// Connect to redux store
export default connect(mapStateToProps, mapDispatchToProps)(WebPlayer);