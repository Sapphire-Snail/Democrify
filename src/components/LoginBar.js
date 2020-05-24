import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import { logout } from "../redux/actions/thunk";
import {
  Button,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import * as spotify from "../SpotifyFunctions.js";
import "./LoginBar.css";

class LoginBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      title: "Top Playlists",
    };
  }

  logout = () => {
    //Pause before we log out
    if (!this.props.isPaused) {
      spotify.pause(this.props.deviceId);
    }
    this.props.logout();
    this.setState({ isRedirect: true });
  };

  render() {
    //Not sure if this is the best way to do a redirect but hey
    if (this.state.isRedirect) {
      return <Redirect to={"/login/"} />;
    }

    //Otherwise get the data and display it
    const { error, loading, data } = this.props.userData;
    if (error) {
      return (
        <p>
          Error
          {error}
        </p>
      );
    }

    if (loading) {
      return (
        <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      );
    }

    if (data && this.props.userData.loggedIn) {
      return (
        <div>
          <Navbar style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
            <NavbarBrand>Welcome, {data.display_name}</NavbarBrand>
            <Button onClick={this.logout} color="link">Log out</Button>
          </Navbar>
        </div>
      );
    }
    return <div />;
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    userData: state.user,
    deviceId: state.webplayer.deviceId,
    isPaused: state.webplayer.playState
      ? state.webplayer.playState.paused
      : true,
  };
}

const mapDispatchToProps = {
  logout,
};

// Connect to redux store
export default connect(mapStateToProps, mapDispatchToProps)(LoginBar);
