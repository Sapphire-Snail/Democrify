import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import SingleTrack from "./SingleTrack";
import { getPlaylistTracks, getPlaylistTracksFromSpotifyAndDB, addSongsFromDBToSpotifyThenGetTracks } from "../redux/actions/thunk";
import { Table } from "reactstrap";


class Tracks extends Component {
  componentDidMount() {
    if (this.props.session.connected_session != undefined) {
      this.props.getPlaylistTracksFromSpotifyAndDB(this.props.active_playlist.id, this.props.session.connected_session.data.joinCode);
    } else {
      if (this.props.active_playlist.session != undefined) {
        console.log("yeeeet")
        console.log(this.props.active_playlist);
        this.props.addSongsFromDBToSpotifyThenGetTracks(this.props.active_playlist.id, this.props.active_playlist.session.joinCode);
      } else {
        this.props.getPlaylistTracks(this.props.active_playlist.id);
      }
    } 
  }

  render() {
    const { error, loading, data } = this.props.tracks;

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (loading) {
      return (
        <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      );
    }

    if (data) {
      return (
        <div>
          <div className="tableContainer">>
          <Table hover size='sm' className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>{this.props.col1Name}</th>
                  <th>{this.props.col2Name}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.items &&
                  data.items.map((item, index) => (
                    <SingleTrack
                      key={item.track.id + index}
                      trackInfo={item.track}
                    />
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    tracks: state.tracks,
    deviceId: state.webplayer.deviceId,
    activePlaylistTitle: state.playlists.active_playlist.name,
    active_playlist: state.playlists.active_playlist, //The tracks retrieved will be those from the active playlist, which must always be kept up to date
    session: state.session
  };
}

const mapDispatchToProps = {
  getPlaylistTracks,
  getPlaylistTracksFromSpotifyAndDB,
  addSongsFromDBToSpotifyThenGetTracks
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
