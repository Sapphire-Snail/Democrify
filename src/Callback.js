import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { login } from './redux/actions/thunk';
import * as spotify from './SpotifyFunctions.js'

// Class that's instantiated when Spotify login screen is closed (redirects us to here)
class Callback extends Component {

  componentDidMount() {
    var token = spotify.checkUrlForAccessToken();
    if(token) {
      this.props.login(token);
    } else {
      console.log("COULD NOT LOG IN");
    }
  }

  render() {
    const { error } = this.props.userData;
    if(error) {
      return <p>
               Error {error}
             </p>
    }

    if (this.props.loggedIn) {
      return <Redirect to="/me" />;
    }

    return <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />;
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    userData: state.user,
    loggedIn: state.user.loggedIn,
  };
}

// Map necessary dispatch functions to props
const mapDispatchToProps = {
  login,
};

// Connect to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Callback);
