import React, { Component } from 'react';
import { loadPlaylists, createPlaylist } from '../redux/actions/thunk';
import { connect } from 'react-redux';
import Playlists from './Playlists/Playlists';

class PlaylistsPage extends Component  {

    componentDidMount() {
        this.props.loadPlaylists(this.props.userId);
    }

    createPlaylist = () => { //This notation allows us to keep reference to this
        this.props.createPlaylist(this.props.userId, "Made with Democrify!"); //All playlists called this until UI updated to let user enter name
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
    loadPlaylists,
    createPlaylist
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);