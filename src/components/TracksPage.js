import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracks } from '../redux/actions/thunk';
import Tracks from './Tracks';
import { Link } from 'react-router-dom';
import * as spotify from "../SpotifyFunctions.js";

class TracksPage extends Component  {
    componentDidMount() {
        this.props.getPlaylistTracks(this.props.playlistId);
    }

    play = () => { //This notation allows us to keep reference to this
        spotify.play(this.props.activePlaylist.uri, this.props.deviceId);
    }

    render() {
        return (
            <div>
                <Link to='/playlists'>Back we go bois</Link>
                <button onClick={this.play}>
                    Play
                </button>
                <h1>{this.props.activePlaylist.name}</h1>
                <Tracks/>
            </div>
        )
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        activePlaylist: state.playlists.active_playlist,
        playlistId: window.location.pathname.split('/').pop(), //Grab playlist ID from URL
        deviceId: state.webplayer.deviceId
    };
}

const mapDispatchToProps = {
    getPlaylistTracks,
}

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);