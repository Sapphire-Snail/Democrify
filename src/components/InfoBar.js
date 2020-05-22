import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import { logout } from "../redux/actions/thunk";
import * as spotify from "../SpotifyFunctions.js";
import { Button, Badge, Container, Row, Col } from "reactstrap";


class InfoBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            isTrackListPage: this.props.isTrackListPage,
            sessionCreated: this.props.session_code,
            backLink: this.props.backLink,
        }
    }

    componentDidUpdate(){
        this.setState({
            sessionCreated: this.props.session_code
        })
    }
    render() {
        return (
          <Container className="stickyContainer" fluid={true}>
            <Row style={{display:"block"}}>

              {" "}
              <h1 className="playlistTitle">
                {this.state.title}
              </h1>
              {this.state.isTrackListPage && (<Button
                disabled={!this.props.can_add}
                className="addButton"
                style={{ backgroundColor: "#c030ed", borderColor: "#c030ed" }}
                onClick={this.toggleSearch}
              > 
                {this.props.can_add
                  ? this.state.searchShowing
                    ? "Back"
                    : "Add track"
                  : "Cannot add track"}
              </Button>)}

              {this.state.sessionCreated && this.state.isTrackListPage && (<h1>
                  Code:{" "}
                  <Badge color="secondary">{this.props.session_code}</Badge>
                </h1>
              )}
            </Row>
            <Row style={{margin:"auto", display:"block"}}>

            <Button  color="primary" tag={Link} to={this.state.backLink}>
              {" "}
              Back{" "}
            </Button>
            {this.state.isTrackListPage && (<Button
              color="primary"
              style={{ marginLeft: 10 }}
              onClick={this.props.createSession}
            >
              Create Session!
            </Button>)}
            </Row>
          </Container>
        )
    }
    
}
function mapStateToProps(state) {
  return {
    session_code: state.playlists.active_playlist.session
      ? state.playlists.active_playlist.session.joinCode
      : "",
    can_add:
      state.playlists.active_playlist.collaborative ||
      state.playlists.active_playlist.owner.id === state.user.data.id, //Only let them add songs if playlist is collab or theirs 
    };}
export default connect(mapStateToProps)(InfoBar);