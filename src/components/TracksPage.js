import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracks } from '../redux/actions/thunk';
import Tracks from './Tracks';
import { Link } from 'react-router-dom';
import * as spotify from "../SpotifyFunctions.js";
import SearchPage from './SearchPage';
import { Button } from 'reactstrap';

class TracksPage extends Component  {

    constructor() {
        super();
        this.state = {
            searchShowing: false
        }
        this.toggleSearch = this.toggleSearch.bind(this);
    }

    toggleSearch() {
        this.setState({searchShowing:!this.state.searchShowing});
        if(!this.state.searchShowing) {
            this.componentDidMount();
        }
    }
    
    componentDidMount() {
        this.props.getPlaylistTracks(this.props.playlistId);
    }
    
    render() {
        return (
            <div>
                <Link to='/playlists'>Back we go bois</Link>
                <h1>{this.props.activePlaylist.name}</h1>
                <div style={{textAlign:"right", marginRight : 10, marginBottom : 10}}><Button style={{backgroundColor: "#c030ed", borderColor : "#c030ed"}} onClick={this.toggleSearch}>{this.state.searchShowing ? 'Back' : 'Add track'}</Button></div>
                {this.state.searchShowing ? <SearchPage/> : <Tracks/>}
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