import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as spotify from "../SpotifyFunctions.js";
import {Button} from 'reactstrap';
import { removeSong } from '../redux/actions/thunk';
import "./Playlists/Playlists.css";

class SingleTrack extends Component {
    constructor() {
        super();
        this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this);
    }


    //Stops the song playing when the + is clicked
        removeSongFromPlaylist (e) {
            this.props.removeSong(this.props.activePlaylistID, this.props.trackInfo.uri);
            this.props.showAlert(this.props.trackInfo.name);
        }

    render() {
        debugger;
        console.log(this.props.isOwnedByTheUser);
        return(            
            <tr onClick={() => {spotify.play(this.props.activePlaylistUri, this.props.deviceId, this.props.trackInfo.uri)}} key={this.props.trackInfo.id}>
                <td className="block">
                    <img src={this.props.trackInfo.album.images[0] ? this.props.trackInfo.album.images[0].url : 'https://f4.bcbits.com/img/a4139357031_10.jpg'} alt="track" className="albumImage"/>
                </td>
                <td>
                    <span style={{cursor:'pointer', color:'white'}}>{this.props.trackInfo.name}</span>
                </td>
                <td>
                    <span>{this.props.trackInfo.artists[0].name}</span>
                </td>
                <td>
                { this.props.isOwnedByTheUser &&             
                <Button onClick={(e) => {this.removeSongFromPlaylist(e)}}>X</Button>}
                </td>
            </tr>
        )
    }
}

// State is entire state tree
function mapStateToProps(state) {
    return {
        activePlaylistUri: state.playlists.active_playlist.uri,
        deviceId: state.webplayer.deviceId,
        search: state.search,
        userID: state.user.data.id,
        activePlaylistID: state.playlists.active_playlist.uri.substring(state.playlists.active_playlist.uri.lastIndexOf(":") + 1),

    };
}
const mapDispatchToProps = {
    removeSong
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTrack);




