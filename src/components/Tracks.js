import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

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
                      {data.items && data.items.map((item) => <SingleTrack key={item.id} trackInfo={item.track}/>)}
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
    };
}

export default connect(mapStateToProps)(Tracks);

//Quick single track item used above
function SingleTrack(props) {
    return(            
        <tr key={props.trackInfo.id}>
            <td>
                <img src={props.trackInfo.album.images[0] ? props.trackInfo.album.images[0].url : 'https://f4.bcbits.com/img/a4139357031_10.jpg'} alt="track" style={{width: 100, height: 100, position: 'absolute'}}/>
            </td>
            <td>
                <span>{props.trackInfo.name}</span>
            </td>
            <td>
                <span>{props.trackInfo.artists[0].name}</span>
            </td>
        </tr>
    )
}

