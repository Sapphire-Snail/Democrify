import React, { Component } from "react";
import { loadPlaylists, createPlaylist } from "../redux/actions/thunk";
import { connect } from "react-redux";
import Playlists from "./Playlists/Playlists";
import "./PopUP.css";
 
class PlaylistsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: "",
      seen: false,
    };
  }

  componentDidMount() {
    this.props.loadPlaylists(this.props.userId);
  }

  render() {
    return (
      <div> 
      <Playlists col1Name="Name" col2Name="Songs" />
      </div>
    );
  }
}

//State is entire state tree
function mapStateToProps(state) {
  return {
    userId: state.user.data ? state.user.data.id : false,
  };
}

const mapDispatchToProps = {
  loadPlaylists,
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);
