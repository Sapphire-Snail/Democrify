import React, { Component , useEffect, useRef } from "react";
import { loadPlaylists, createPlaylist } from "../redux/actions/thunk";
import { connect } from "react-redux";
import Playlists from "./Playlists/Playlists";
import { Link } from "react-router-dom";
import { Collapse, CardBody, Card, Button } from "reactstrap";
import { notify } from "react-notify-toast";
import "./PopUP.css";
import * as Scroll from 'react-scroll';
import {  Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
 
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
