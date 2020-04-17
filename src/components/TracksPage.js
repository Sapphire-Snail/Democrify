import React, { Component } from 'react';
import { connect } from 'react-redux';

class TracksPage extends Component  {

    render() {
        return (
            <div>
                Playlist id: {this.props.playlistId}
            </div>
        )
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        playlistId: window.location.pathname.split('/').pop(), //Grab playlist ID from URL
    };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);