import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as spotify from "../SpotifyFunctions.js";
import "./Playlists/Playlists.css"
class SingleTrack extends Component {
    render() {
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
            </tr>
        )
    }
}

// State is entire state tree
function mapStateToProps(state) {
    return {
        activePlaylistUri: state.playlists.active_playlist.uri,
        deviceId: state.webplayer.deviceId,
    };
}

export default connect(mapStateToProps)(SingleTrack);