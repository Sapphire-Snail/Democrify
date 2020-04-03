import React, { Component } from 'react';
import axios from "axios";
import SinglePlaylist from './SinglePlaylist';

class Playlists extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            playlistData : {}
        };
    }

    async componentDidMount() {
        console.log("Fetching playlists");
        //Request playlists from api
        const res = await axios({
            method: "post",
            url: "/api/getUserPlaylists",
            timeout: 80000,
            data: {
                userId: this.props.userId,
            }
        });
        //Update state with returned data (componentDidMount automatically recalls render upon state update)
        this.setState({playlistData : res.data.body});
    }

    render() {
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
                    {this.state.playlistData.items && this.state.playlistData.items.map((item) => <SinglePlaylist key={item.id} playlistInfo={item}/>)}
                </tbody>
                </table>
            </div>
        );
    }
}

export default Playlists;