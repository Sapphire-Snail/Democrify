import React from 'react';
import { connect } from 'react-redux';
import SinglePlaylist from './SinglePlaylist';

function Playlists({playlists})  {
    return(
        <div>
            <h1>Top 10 playlists: </h1>
            <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Song Count</th>
                </tr>
            </thead>
            <tbody>
                {playlists.items && playlists.items.map((item) => <SinglePlaylist key={item.id} playlistInfo={item}/>)}
            </tbody>
            </table>
        </div>
    );
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        playlists: state.playlists
    };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);