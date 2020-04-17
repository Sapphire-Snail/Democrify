import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracks } from '../redux/actions/thunk';

class TracksPage extends Component  {
    componentDidMount() {
        this.props.getPlaylistTracks(this.props.playlistId);
    }

    render() {
        if(this.props.activePlaylist) {
            return (
                <div>
                    Playlist: {this.props.activePlaylist.name}
                    Data's been got (if you look in redux devtools extension) just need to display it here
                </div>
            )
        }
        return <div/>
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        activePlaylist: state.playlists.active_playlist,
        playlistId: window.location.pathname.split('/').pop(), //Grab playlist ID from URL
    };
}

const mapDispatchToProps = {
    getPlaylistTracks,
}

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);