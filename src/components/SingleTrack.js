import React, { Component } from "react";
import { connect } from "react-redux";
import * as spotify from "../SpotifyFunctions.js";
import { Button } from "reactstrap";
import { removeSong, getPlaylistTracks } from "../redux/actions/thunk";
import "./Playlists/Playlists.css";
import { notify } from "react-notify-toast";

class SingleTrack extends Component {
  constructor() {
    super();
    this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this);
  }

  //Stops the song playing when the + is clicked
  removeSongFromPlaylist(e) {
    this.props.removeSong(
      this.props.activePlaylistID,
      this.props.trackInfo.uri
    );
    notify.show("Removed song " + this.props.trackInfo.name, "success", 2000);
    this.props.getPlaylistTracks(this.props.activePlaylistID);
  }

  playTrack = () => {
    spotify.play(
      this.props.activePlaylistUri,
      this.props.deviceId,
      this.props.trackInfo.uri
    );
  };

  render() {
    return (
      <tr key={this.props.trackInfo.id}>
        <td className="block" onClick={this.playTrack}>
          <img
            src={
              this.props.trackInfo.album.images[0]
                ? this.props.trackInfo.album.images[0].url
                : "https://f4.bcbits.com/img/a4139357031_10.jpg"
            }
            alt="track"
            className="albumImage"
          />
        </td>
        <td onClick={this.playTrack}>
          <span style={{ cursor: "pointer", color: "white" }}>
            {this.props.trackInfo.name}
          </span>
        </td>
        <td onClick={this.playTrack}>
          <span>{this.props.trackInfo.artists[0].name}</span>
        </td>
        <td>
          {this.props.can_delete && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                this.removeSongFromPlaylist(e);
              }}
            >
              X
            </Button>
          )}
        </td>
      </tr>
    );
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    activePlaylistUri: state.playlists.active_playlist.uri,
    deviceId: state.webplayer.deviceId,
    search: state.search,
    userID: state.user.data.id,
    activePlaylistID: state.playlists.active_playlist.uri.substring(
      state.playlists.active_playlist.uri.lastIndexOf(":") + 1
    ),
    can_delete:
      state.playlists.active_playlist.collaborative ||
      state.playlists.active_playlist.owner.id === state.user.data.id, //Only let them delete songs if playlist is collab or theirs
  };
}
const mapDispatchToProps = {
  removeSong,
  getPlaylistTracks,
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTrack);
