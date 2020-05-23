import React, { Component } from "react";
import { connect } from "react-redux";
import * as spotify from "../SpotifyFunctions.js";
import { removeSong, getPlaylistTracks, getPlaylistTracksFromSpotifyAndDB, removeSongFromDB } from "../redux/actions/thunk";
import "./Playlists/Playlists.css";
import { notify } from "react-notify-toast";
import { AiFillCloseCircle } from "react-icons/ai";

class SingleTrack extends Component {
  constructor() {
    super();
    this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this);
  }

  removeSongFromPlaylist(e) {
    notify.show("Removed song " + this.props.trackInfo.name, "success", 2000);
    //If the song is stored in DB
    if (this.props.trackInfo.addedBy) {
      this.props.removeSongFromDB(this.props.trackInfo.uri, this.props.session.connected_session.data.joinCode);      
      this.props.getPlaylistTracksFromSpotifyAndDB(this.props.activePlaylistID, this.props.session.connected_session.data.joinCode);
    } else {
      this.props.removeSong(
        this.props.activePlaylistID,
        this.props.trackInfo.uri
      );
      this.props.getPlaylistTracks(this.props.activePlaylistID);
    }
  }

  playTrack = () => {
    //We cannot use the playlist context for tracks that are not actually added to the playlist on Spotify yet.
    //These tracks are just in the DB so we use the album context instead.
    var context = this.props.activePlaylistUri;
    if (this.props.trackInfo.addedBy) {
      context = this.props.trackInfo.album.uri;
    }
    spotify.play(
      context,
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
            <AiFillCloseCircle size={25} onClick={(e) => {
              e.preventDefault();
              this.removeSongFromPlaylist(e);
            }} style={{cursor: 'pointer'}}/>
          )}
        </td>
      </tr>
    );
  }
}

// State is entire state tree
function mapStateToProps(state, ownProps) {
  return {
    activePlaylistUri: state.playlists.active_playlist.uri,
    deviceId: state.webplayer.deviceId,
    search: state.search,
    userID: state.user.data.id,
    activePlaylistID: state.playlists.active_playlist.uri.substring(
      state.playlists.active_playlist.uri.lastIndexOf(":") + 1
    ),
    can_delete:
      state.playlists.active_playlist.owner.id === state.user.data.id ||
      ownProps.trackInfo.addedBy === state.user.data.id, //Only let them delete songs if they own the playlist or they added the track, and it hasnt been added to spotify yet
    session: state.session
  };
}
const mapDispatchToProps = {
  removeSong,
  getPlaylistTracks,
  getPlaylistTracksFromSpotifyAndDB,
  removeSongFromDB
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTrack);
