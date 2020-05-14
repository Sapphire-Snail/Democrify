import React, { Component } from 'react';
import { loadPlaylists, createPlaylist } from '../redux/actions/thunk';
import { connect } from 'react-redux';
import Playlists from './Playlists/Playlists';
import { Link } from 'react-router-dom';

class PlaylistsPage extends Component  {

    componentDidMount() {
        this.props.loadPlaylists();
    }

    createPlaylist = () => { //This notation allows us to keep reference to this
        this.props.createPlaylist(this.props.userId, "Made with Democrify!"); //All playlists called this until UI updated to let user enter name
    }

    render() {
        return (
            <div>
                <Link to='/me'>Back we go bois</Link>
                <Playlists title="Top playlists:" col1Name="Name" col2Name="Songs"/>
                <button className="button button--loginApp-link" onClick={this.createPlaylist}>
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