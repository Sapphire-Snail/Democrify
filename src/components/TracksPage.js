import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSessionFromPlaylist,
  createPlaylistSession,
  setCollaborative,
} from "../redux/actions/thunk";
import Tracks from "./Tracks";
import { Link } from "react-router-dom";
import SearchPage from "./SearchPage";
import { Button } from "reactstrap";
import "./TrackPage.css";

class TracksPage extends Component {
  constructor() {
    super();
    this.state = {
      searchShowing: false,
      refreshList: false,
      removedSong: false,
    };
    this.toggleSearch = this.toggleSearch.bind(this);
    this.createSession = this.createSession.bind(this);
  }

  createSession = () => {
    this.props.createPlaylistSession(
      this.props.activePlaylist.id,
      this.props.userID
    );
    //If the playlist is the owners, make it collaborative then create the session
    if (this.props.activePlaylist.owner.id === this.props.userID && !this.props.activePlaylist.collaborative) {
      this.props.setCollaborative(true, this.props.activePlaylist.id);
    }
  }

  getSession = () => {
    this.props.getSessionFromPlaylist(this.props.userID, this.props.activePlaylist.id)
  }

  toggleSearch() {
    this.setState({ searchShowing: !this.state.searchShowing });
  }

  render() {
    return (
      <div>
        <Button color='primary' tag={Link} to='/playlists'> Back </Button>
        <Button color='primary' style={{ marginLeft: 10}} onClick={this.createSession}>Create Session!</Button>
        <div className="stickyContainer">
          <h1 className="playlistTitle">{this.props.activePlaylist.name}</h1>
          <Button
            disabled={!this.props.can_add}
            className="addButton"
            style={{ backgroundColor: "#c030ed", borderColor: "#c030ed" }}
            onClick={this.toggleSearch}
          >
            {this.props.can_add
              ? this.state.searchShowing
                ? "Back"
                : "Add track"
              : "Cannot add track"}
          </Button>
          <Button color='primary' className="addButton" onClick={this.getSession}>Get Session</Button>
        </div>
        {this.state.searchShowing ? (
          <SearchPage />
        ) : (
          <Tracks
            col1Name="Name"
            col2Name="Artist"
          />
        )}
      </div>
    );
  }
}
//State is entire state tree
function mapStateToProps(state) {
  return {
    activePlaylist: state.playlists.active_playlist,
    can_add:
      state.playlists.active_playlist.collaborative ||
      state.playlists.active_playlist.owner.id === state.user.data.id, //Only let them add songs if playlist is collab or theirs
    playlistId: window.location.pathname.split("/").pop(), //Grab playlist ID from URL
    deviceId: state.webplayer.deviceId,
    userID: state.user.data ? state.user.data.id : null
  };
}

const mapDispatchToProps = {
  createPlaylistSession,
  setCollaborative,
  getSessionFromPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);
