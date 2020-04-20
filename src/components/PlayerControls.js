import React, { Component } from "react";
import { connect } from "react-redux";
import "./PlayerControls.scss";
import * as spotify from "../SpotifyFunctions.js";

class PlayerControls extends Component { 
    
    togglePlay = () => {
        if(this.props.isPaused) {
            spotify.play(null, this.props.deviceId, null)
        } else {
            spotify.pause(this.props.deviceId);
        }
     }

    render() {
        console.log(this.props);
        return(
            <div className="player">
                {/* <img src={'https://f4.bcbits.com/img/a4139357031_10.jpg'} alt="songArt" style={{width: 100, height: 100, position: 'absolute'}}/> */}
                <p>Now playing</p>  
                <div onClick={this.togglePlay}>
                    <div className='pcontainer'>
                        <div className={this.props.isPaused ? 'pbtn play' : 'pbtn pause'}>
                        {/* <div className={"pbtn play"}> */}
                            <span className="bar bar-1"></span>
                            <span className="bar bar-2"></span>				
                        </div>
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
        isPaused: state.webplayer.playState ? state.webplayer.playState.paused : true
    };
}
  
// Connect to redux store
export default connect(mapStateToProps)(PlayerControls);