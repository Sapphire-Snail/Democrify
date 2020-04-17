import React, { Component } from 'react';
import { connect } from 'react-redux';

class TracksPage extends Component  {
    render() {
        if(this.props.activePlaylist) {
            return (
                <div>
                    Playlist id: {this.props.activePlaylist.name}
                </div>
            )
        }
        return <div/>
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        playlistId: window.location.pathname.split('/').pop(), //Grab playlist ID from URL
        playlists: state.playlists,
        activePlaylist: state.activePlaylist
    };
}

export default connect(mapStateToProps)(TracksPage);