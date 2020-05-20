import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import SingleSearchItem from './SingleSearchItem';
import "./Playlists/Playlists.css"

class Search extends Component {
    render() {
        const { error, loading, data } = this.props.tracks;

        if(error) {
            return <p>Error: {error}</p>
        }

        if(loading) {
            return <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
        }

        if(data) {
            return(
                <div>
                    <div className="container tableContainer">>
                    <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{this.props.col1Name}</th>
                            <th>{this.props.col2Name}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tracks.items && data.tracks.items.map((item, index) => <SingleSearchItem key={item.id} trackInfo={item} showAlert={this.showAlert}></SingleSearchItem>)}
                    </tbody>
                    </table>
                    </div>
                </div>
            );
        }

        return <div/>
    }
}

// State is entire state tree
const mapStateToProps = (state) => {
    return {
        tracks: state.search,
        activePlaylistTitle: state.playlists.active_playlist.name
    };
}

export default connect(mapStateToProps)(Search);

