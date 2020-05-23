import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { getPlaylistTracks } from "../redux/actions/thunk";
import SearchPage from "./SearchPage";
import Tracks from "./Tracks";
import { getSession } from "../redux/actions/thunk";
import SessionInfoBar from "./SessionInfoBar";

class SessionPage extends Component {
  constructor() {
    super();
    this.state = {
      searchShowing: false,
    };
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleSearch() {
    this.setState({ searchShowing: !this.state.searchShowing });
    if (this.state.searchShowing) {
      this.props.getPlaylistTracks(
        this.props.session.connected_session.data.playlistURI
      );
    }
  }

  render() {
    const { error, loading, connected_session } = this.props.session;

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (loading) {
      return (
        <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      );
    }

    if (connected_session.data) {
      return (
        <div>
        <SessionInfoBar title={this.props.active_playlist.name} hostID={this.props.session.connected_session.data.hostID} backLink='/me' toggleSearch={this.toggleSearch}/>
          {this.state.searchShowing ? (
            <SearchPage />
          ) : (
            <Tracks col1Name="Name" col2Name="Artist" />
          )}
        </div>
      );
    }
    return <div />;
  }
}
//State is entire state tree
function mapStateToProps(state) {
  return {
    code: window.location.pathname.split("/").pop(), //Grab playlist ID from URL
    can_add:
      state.playlists.active_playlist.collaborative ||
      state.playlists.active_playlist.owner.id === state.user.data.id, //Only let them add songs if playlist is collab or theirs
    session: state.session,
    active_playlist: state.playlists.active_playlist,
  };
}

const mapDispatchToProps = {
  getPlaylistTracks,
  getSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
