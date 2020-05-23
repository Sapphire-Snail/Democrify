import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import SinglePlaylist from "./SinglePlaylist";
import { getUserSessions } from "../../redux/actions/thunk";
import "./Playlists.css";
import InfoBar from "../InfoBar";
class Playlists extends Component {
  render() {
    const { error, loading, data } = this.props.playlists;

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
          <InfoBar title="Top Playlists" backLink='/me' isPlaylistPage={true}> </InfoBar>
          <div className="container tableContainer">
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
                  data.items.map((item) => (
                    <SinglePlaylist isSession={item.session} key={item.id} playlistInfo={item} />
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
    playlists: state.playlists,
    userID: state.user.data ? state.user.data.id : null
  };
}

const mapDispatchToProps = {
  getUserSessions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
