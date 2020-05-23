import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createPlaylistSession,
  setCollaborative,
} from "../redux/actions/thunk";
import Tracks from "./Tracks";
import SearchPage from "./SearchPage";
import "./TrackPage.css";
import InfoBar from "./InfoBar";

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
    if (
      this.props.activePlaylist.owner.id === this.props.userID &&
      !this.props.activePlaylist.collaborative
    ) {
      this.props.setCollaborative(true, this.props.activePlaylist.id);
    }
  };

  //TODO: make a componentdidmount that gets active playlist from the list of playlists based off the id from the URL

  toggleSearch() {
    this.setState({ searchShowing: !this.state.searchShowing });
  }

  render() {
    console.log("render");
    return (
      <div>
        <InfoBar
          title={this.props.activePlaylist.name}
          isTrackListPage={true}
          backLink="/playlists"
          createSession={this.createSession}
          toggleSearch={this.toggleSearch}
        />
        {this.state.searchShowing ? (
          <SearchPage />
        ) : (
          <Tracks col1Name="Name" col2Name="Artist" />
        )}
      </div>
    );
  }
}
//State is entire state tree
function mapStateToProps(state) {
  return {
    hosted_session: state.session.hosted_session
      ? state.session.hosted_session.data
      : null,
    session_code: state.playlists.active_playlist.session
      ? state.playlists.active_playlist.session.joinCode
      : "",
    activePlaylist: state.playlists.active_playlist,
    can_add:
      state.playlists.active_playlist.collaborative ||
      state.playlists.active_playlist.owner.id === state.user.data.id, //Only let them add songs if playlist is collab or theirs
    playlistId: window.location.pathname.split("/").pop(), //Grab playlist ID from URL
    deviceId: state.webplayer.deviceId,
    userID: state.user.data ? state.user.data.id : null,
  };
}

const mapDispatchToProps = {
  createPlaylistSession,
  setCollaborative,
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);
