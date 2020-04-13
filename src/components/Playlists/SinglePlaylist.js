import React from 'react';

function SinglePlaylist(props) {
    return(
        <tr key={props.playlistInfo.id}>
            <td>
            <img src={props.playlistInfo.images[0] ? props.playlistInfo.images[0].url : 'https://f4.bcbits.com/img/a4139357031_10.jpg'} alt="playlist" style={{width: 100, height: 100, position: 'absolute'}}/>
            </td>
            <td>
            <span>{props.playlistInfo.name}</span>
            </td>
            <td>
            <span>{props.playlistInfo.tracks.total}</span>
            </td>
        </tr>
    );

}

export default SinglePlaylist;
