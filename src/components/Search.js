import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import SingleSearchItem from './SingleSearchItem';
import { Alert } from 'reactstrap';
import "./Playlists/Playlists.css"

class Search extends Component {
    constructor() {
        super();
        this.showAlert = this.showAlert.bind(this);
        this.state = {
            showAlert : false,
            alertText : ""
        }
    }

    //Disappears after 2 seconds using a timeout
    showAlert(songTitle) {  
        this.setState({
            showAlert:true,
            alertText: songTitle + " added to " + this.props.activePlaylistTitle,
        },
            ()=> {window.clearTimeout(this.timeout); this.timeout = window.setTimeout(()=>{this.setState({showAlert:false})},4000)});
    }

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
                    {this.state.showAlert && <Alert style={{position:'fixed', top:10, left: '50%', transform: 'translate(-50%, 0)'}}color="success">{this.state.alertText}</Alert>}
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

