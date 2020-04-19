import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import SingleTrack from './SingleTrack';

class Tracks extends Component {

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
                  <table className="table">
                  <thead>
                      <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Artist</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.items && data.items.map((item, index) => <SingleTrack key={item.track.id} trackInfo={item.track}/>)}
                  </tbody>
                  </table>
              </div>
          );
      }
      return <div/>
    }
}

// State is entire state tree
function mapStateToProps(state) {
    return {
        tracks: state.tracks,
        deviceId: state.webplayer.deviceId
    };
}

export default connect(mapStateToProps)(Tracks);

