import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";
import { getPlaylistTracks } from '../redux/actions/thunk';
import { Button } from "reactstrap";
import { Link } from 'react-router-dom';
import SearchPage from "./SearchPage";
import Tracks from './Tracks';


class SessionPage extends Component {
    constructor() {
        super();
        this.state = {
            searchShowing: false
        }
        this.toggleSearch = this.toggleSearch.bind(this);
    }

    componentDidMount() {
        
    }
    toggleSearch() {
        this.setState({searchShowing:!this.state.searchShowing});
        if(this.state.searchShowing) {
            this.componentDidMount();
            this.props.getPlaylistTracks(this.props.session.connected_session.data.playlistURI);
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

        if(connected_session.data) {
            return (
                <div>
                <Link to="/me">Back we go bois</Link>
                <div className="stickyContainer">
                <h1 className="playlistTitle">{this.props.active_playlist.name}</h1>
                <p> Host ID: {this.props.session.connected_session.data.hostID} </p>
                  <Button  className="addButton"
                    style={{ backgroundColor: "#c030ed", borderColor: "#c030ed" }}
                    onClick={this.toggleSearch}
                  >
                    {this.state.searchShowing ? "Back" : "Add track"}
                  </Button>
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
        return <div />;
    }
}
//State is entire state tree
function mapStateToProps(state) {
    return {
        code: window.location.pathname.split('/').pop(), //Grab playlist ID from URL
        session: state.session,
        active_playlist: state.playlists.active_playlist
    };
}

const mapDispatchToProps = {
    getPlaylistTracks,
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
