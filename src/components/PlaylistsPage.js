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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadPlaylists(this.props.userId);
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
    this.scrollToBottom();
  };

  handleChange(event) {
    this.setState({ listname: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.listname === "") {
      notify.show("Enter playlist name", "error");
    } else {
      this.setState({ seen: false, listname: "" });
      this.props.createPlaylist(this.props.userId, this.state.listname);
      notify.show("Successfully created playlist", "success");
    }
  }

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  render() {

    
    return (
      <div> 
        
        <div className="UpperBtn">
          <Button color='primary' tag={Link} to='/me'> Back </Button>
          <Collapse isOpen={!this.state.seen}>
            <button
              className="btn-UpperCreate button button--loginApp-link"
              onClick={this.togglePop} 
            >
              Create Playlist
            </button>
          </Collapse>
        </div>
        <Playlists title="Top playlists" col1Name="Name" col2Name="Songs" />
        <div>
          {/* <Collapse isOpen={!this.state.seen}>
            <button
              className="button button--loginApp-link"
              onClick={this.togglePop}
            >
              Create Playlist
            </button>
          </Collapse> */}
        </div>
        {/*  {this.state.isOpen ? <PopUp toggle={this.togglePop} /> : null}  */}

       <Collapse isOpen={this.state.seen}>
          <Card style={{backgroundColor: 'transparent', borderWidth: '0'}} className={"inputListnameCard"}>
            <CardBody>
              <form onSubmit={this.handleSubmit}>
                <br />
                <label>
                  <input
                    placeholder="Playlist Name"
                    type="text"
                    className={'playlistInput'}
                    value={this.state.listname}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
               
                <Button color="success" onClick={this.handleSubmit}>
                  Submit
                </Button>
                <Button className={'closeBtn'} onClick={this.togglePop}>Close</Button>
              </form>
            </CardBody>
          </Card>
        </Collapse>
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
