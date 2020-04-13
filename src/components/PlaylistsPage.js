import React, { Component } from 'react';
import { loadPlaylists } from '../redux/actions/thunk';
import { connect } from 'react-redux';
import Playlists from './Playlists/Playlists';

class PlaylistsPage extends Component  {

    componentDidMount() {
        this.props.loadPlaylists(this.props.userId);
    }

    createPlaylist() {
        console.log("ligma");
    }

    render() {
        return (
            <div>
                <Playlists/>
                <button key={0} className="btn btn--loginApp-link" onClick={this.createPlaylist}>
                            Create Playlist
                </button>
            </div>
        )
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        userId: state.user.data ? state.user.data.id : false
    };
}

const mapDispatchToProps = {
    loadPlaylists
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);