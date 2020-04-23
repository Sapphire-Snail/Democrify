import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as spotify from "../SpotifyFunctions.js";
import { Button, Alert } from 'reactstrap';
import { addSong } from '../redux/actions/thunk';

class SingleSearchItem extends Component {
    constructor() {
        super();
        this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    }

    //Stops the song playing when the + is clicked
    addSongToPlaylist (e) {
        this.props.addSong(this.props.activePlaylistID, this.props.trackInfo.uri);
        this.props.showAlert(this.props.trackInfo.name);
        e.stopPropagation();
    }

    render() {
        return(            
            <tr onClick={() => {spotify.play(this.props.trackInfo.album.uri, this.props.deviceId, this.props.trackInfo.uri)}} key={this.props.trackInfo.id}>
                <td>
                    <img src={this.props.trackInfo.album.images[0] ? this.props.trackInfo.album.images[0].url : 'https://f4.bcbits.com/img/a4139357031_10.jpg'} alt="track" style={{width: 100, height: 100, position: 'absolute'}}/>
                </td>
                <td>
                    <span style={{cursor:'pointer', color:'blue'}}>{this.props.trackInfo.name}</span>
                </td>
                <td>
                    <span>{this.props.trackInfo.artists[0].name}</span>
                </td>
                <td>
                    <Button onClick={(e) => {this.addSongToPlaylist(e)}}>+</Button>
                </td>
            </tr>
        )
    }
}

// State is entire state tree
const mapStateToProps = (state) => {
    return {
        activePlaylistUri: state.playlists.active_playlist.uri,
        activePlaylistID: state.playlists.active_playlist.uri.substring(state.playlists.active_playlist.uri.lastIndexOf(":") + 1),
        deviceId: state.webplayer.deviceId,
        search: state.search
    };
}

const mapDispatchToProps = {
    addSong
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleSearchItem);