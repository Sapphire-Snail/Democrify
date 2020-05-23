import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as spotify from "../SpotifyFunctions.js";
import { Button } from 'reactstrap';
import { addSong, addSongToDB } from '../redux/actions/thunk';
import "./Playlists/Playlists.css"
import { notify } from 'react-notify-toast';

class SingleSearchItem extends Component {
    constructor() {
        super();
        this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    }

    //Stops the song playing when the + is clicked
    addSongToPlaylist (e) {
        if (this.props.canAddDirectly) {
            this.props.addSong(this.props.activePlaylistID, this.props.trackInfo.uri);
        } else {
            this.props.addSongToDB(this.props.session.connected_session.data.joinCode, this.props.trackInfo);
        }
        notify.show("Added song " + this.props.trackInfo.name, "success", 2000);
    }

    render() {
        return(            
            <tr key={this.props.trackInfo.id}>
                <td onClick={() => {spotify.play(this.props.trackInfo.album.uri, this.props.deviceId, this.props.trackInfo.uri)}}>
                    <img src={this.props.trackInfo.album.images[0] ? this.props.trackInfo.album.images[0].url : 'https://f4.bcbits.com/img/a4139357031_10.jpg'} alt="track" className="albumImage"/>
                </td>
                <td onClick={() => {spotify.play(this.props.trackInfo.album.uri, this.props.deviceId, this.props.trackInfo.uri)}}>
                    <span style={{cursor:'pointer', color:'blue'}}>{this.props.trackInfo.name}</span>
                </td>
                <td onClick={() => {spotify.play(this.props.trackInfo.album.uri, this.props.deviceId, this.props.trackInfo.uri)}}>
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
        session: state.session,
        activePlaylistID: state.playlists.active_playlist.uri.substring(state.playlists.active_playlist.uri.lastIndexOf(":") + 1),
        deviceId: state.webplayer.deviceId,
        search: state.search,
        canAddDirectly: state.playlists.active_playlist.owner.id === state.user.data.id
    };
}

const mapDispatchToProps = {
    addSong,
    addSongToDB
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleSearchItem);