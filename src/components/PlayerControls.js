import React, { Component } from "react";
import { connect } from "react-redux";
import "./PlayerControls.scss";
import * as spotify from "../SpotifyFunctions.js";
import { FiSkipForward } from 'react-icons/fi';


class PlayerControls extends Component { 
    
    togglePlay = () => {
        if(this.props.isPaused) {
            spotify.play(null, this.props.deviceId, null)
        } else {
            spotify.pause(this.props.deviceId);
        }
     }

     skip = () => {
         spotify.skipToNext(this.props.deviceId);
     }

    render() {
        if(!this.props.nowPlaying) {
            return <div/>
        }
        return(
            <div className='player'>
                <div className='art'>
                    {this.props.nowPlaying.album && <img src={this.props.nowPlaying.album.images[0].url} alt="songArt" style={{width: 100, height: 100}}/>}
                </div>
                <div className='trackInfo'>
                    <p>{this.props.nowPlaying.name}</p>
                    <p>{this.props.nowPlaying.artists[0].name}</p>  
                </div>
                <div onClick={this.togglePlay}>
                    <div className='pcontainer'>
                        <div className={this.props.isPaused ? 'pbtn play' : 'pbtn pause'}>
                        {/* <div className={"pbtn play"}> */}
                            <span className="bar bar-1"></span>
                            <span className="bar bar-2"></span>				
                        </div>
                        <FiSkipForward size={25} onClick={this.skip} className='skipBtn'/>
                    </div>
                </div>
                
            </div>
        )
    }
  }
  
  
// State is entire state tree
function mapStateToProps(state) {
    return {
        deviceId: state.webplayer.deviceId,
        isPaused: state.webplayer.playState ? state.webplayer.playState.paused : true,
        nowPlaying: state.webplayer.playState ? state.webplayer.playState.track_window.current_track : null,
    };
}
  
// Connect to redux store
export default connect(mapStateToProps)(PlayerControls);