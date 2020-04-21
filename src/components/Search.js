import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import SingleTrack from './SingleTrack';

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
                  <table className="table">
                  <thead>
                      <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Artist</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.tracks.items && data.tracks.items.map((item, index) => <SingleTrack key={item.id} trackInfo={item}/>)}
                  </tbody>
                  </table>
              </div>
          );
      }
      return <div/>
    }
}

// State is entire state tree
const mapStateToProps = (state) => {
    console.log(state);
    return {
        tracks: state.search,
        deviceId: state.webplayer.deviceId
    };
}

export default connect(mapStateToProps)(Search);

