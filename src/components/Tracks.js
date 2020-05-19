import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import SingleTrack from "./SingleTrack";

class Tracks extends Component {
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

    //TODO: Some songs return a 403 if they aren't available in, but are still being shown
    if (data) {
      return (
        <div>
          {" "}
          <div className="tableCaptionContainer">
          </div>
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>{this.props.col1Name}</th>
                  <th>{this.props.col2Name}</th>
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
  };
}

export default connect(mapStateToProps)(Tracks);
