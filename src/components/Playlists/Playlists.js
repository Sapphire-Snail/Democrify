import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { loadPlaylists } from '../../redux/actions/thunk';
import SinglePlaylist from './SinglePlaylist';

class Playlists extends Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.loadPlaylists(this.props.userId);
    } else {
      console.log('bad');
    }
  }

  render() {
    const { error, loading, data } = this.props.playlists;

    if (error) {
      return (
        <p>
          Error
          {error}
        </p>
      );
    }

    if (loading) {
      return <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />;
    }

    if (data) {
      return (
        <div>
          <h1>Top 10 playlists: </h1>
          <table className="table">
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Song Count</th>
              </tr>
            </thead>
            <tbody>
              {data.items && data.items.map((item) => <SinglePlaylist key={item.id} playlistInfo={item} />)}
            </tbody>
          </table>
        </div>
      );
    }
    return <div />;
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    playlists: state.playlists,
    userId: state.user.data ? state.user.data.id : false,
  };
}

const mapDispatchToProps = {
  loadPlaylists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
