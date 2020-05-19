import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import SingleTrack from "./SingleTrack";
import { Alert } from "reactstrap";
import { getPlaylistTracks } from "../redux/actions/thunk";

class Tracks extends Component {
  constructor() {
    super();
    this.showAlert = this.showAlert.bind(this);
    this.state = {
      showAlert: false,
      alertText: "",
    };
  }
  componentDidMount() {
    this.props.getPlaylistTracks(this.props.active_playlist.id);
  }
  showAlert(songTitle) {
    this.setState(
      // This is a very roundabout way to delay refreshing the playlist. Could not think of a better one
      // Also probably not the best place for this code. But it works!
      () => {
        this.timeout = window.setTimeout(() => {
          this.props.getPlaylistTracks(this.props.active_playlist.id);
          this.setState({
            showAlert: true,
            alertText:
              songTitle + " removed from " + this.props.activePlaylistTitle,
          });
        }, 500);
      },

      //Disappears after 2 seconds using a timeout
      () => {
        this.timeout = window.setTimeout(() => {
          this.setState({ showAlert: false });
        }, 2000);
      }
    );
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

    //TODO: Some songs return a 403 if they aren't available in this region, but are still being shown
    if (data) {
      console.log("From Tracks class" + this.props.isOwnedByTheUser);
      return (
        <div>
          {" "}
          {this.state.showAlert && (
            <Alert
              style={{
                position: "fixed",
                top: 10,
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
              color="success"
            >
              {this.state.alertText}
            </Alert>
          )}
          <div className="tableCaptionContainer"></div>
          <div className="container">
            <table className="table">
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
                      showAlert={this.showAlert}
                    />
                  ))}
              </tbody>
            </table>
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
  };
}

const mapDispatchToProps = {
  getPlaylistTracks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
