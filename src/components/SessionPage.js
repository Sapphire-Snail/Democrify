import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";
import "./TrackPage.css";

class SessionPage extends Component {
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

    if(connected_session.data) {
        return (
            <div> {connected_session.data.playlistURI} </div>
        );
    }

    return <div />;
  }
}
//State is entire state tree
function mapStateToProps(state) {
    return {
        code: window.location.pathname.split('/').pop(), //Grab playlist ID from URL
        session: state.session,
    };
}

export default connect(mapStateToProps)(SessionPage);
