import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setPlaylist } from '../../redux/actions/thunk';
import { connect } from 'react-redux';
import "./Playlists.css"
import { RiRadioButtonLine} from 'react-icons/ri'

class SinglePlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false
        };
    }
    
    handleChange = param => e => {
        // param is the argument you passed to the function
        // e is the event object that returned
        this.props.setPlaylist(param);
        this.setState({isRedirect: true});
    };
   
    render() {
        if(this.state.isRedirect) {
            return <Redirect to={'/playlist/' + this.props.playlistInfo.id}/>
        }

        return(
            <tr key={this.props.playlistInfo.id}>
                <td className="tableCell">
                    <img src={this.props.playlistInfo.images[0] ? this.props.playlistInfo.images[0].url : 'https://f4.bcbits.com/img/a4139357031_10.jpg'} alt="playlist" className="albumImage"/>
                </td>
                <td className="tableCell">
                    <span style={{cursor:'pointer', color:'white'}} onClick={this.handleChange(this.props.playlistInfo)}>{this.props.playlistInfo.name}</span>
                </td>
                <td className="tableCell">
                    <span style={{cursor:'pointer'}}>{this.props.playlistInfo.tracks.total}</span>
                    {this.props.isSession && <RiRadioButtonLine size={25} style={{color: '#00ab25'}} />}
                </td>
            </tr>
        );
    }
}

const mapDispatchToProps = {
    setPlaylist
}

export default connect(null, mapDispatchToProps)(SinglePlaylist);
