import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadPlaylists, createPlaylist } from "../redux/actions/thunk";
import {
  Button,
  Badge,
  Container,
  Row,
  Col,
  Collapse,
  CardBody,
  Card,
} from "reactstrap";
import { notify } from "react-notify-toast";

class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      isTrackListPage: this.props.isTrackListPage,
      isPlaylsitPage: this.props.isPlaylistPage,
      sessionCreated: this.props.session_code,
      searchShowing: false,
      backLink: this.props.backLink,
      listname: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  handleChange(event) {
    this.setState({ listname: event.target.value });
  }

  toggleSearch = () => {
    this.setState({ searchShowing: !this.state.searchShowing });
    this.props.toggleSearch();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.listname === "") {
      notify.show("Enter playlist name", "error");
    } else {
      this.setState({ seen: false, listname: "" });
      this.props.createPlaylist(this.props.userID, this.state.listname);
      notify.show("Successfully created playlist " + this.state.listname, "success");
    }
  }

  render() {
    return (
      <Container className="stickyContainer" fluid={true}>
        <Row style={{ display: "block" }}>
          {" "}
          <h1 className="playlistTitle">{this.state.title}</h1>
          {this.state.isTrackListPage && (
            <Button
              disabled={!this.props.can_add}
              className="addButton"
              style={{ backgroundColor: "#c030ed", borderColor: "#c030ed" }}
              onClick={this.toggleSearch}
            >
              {this.props.can_add
                ? this.state.searchShowing
                  ? "Back to the playlsit"
                  : "Add track"
                : "Cannot add track"}
            </Button>
          )}
          {this.state.isTrackListPage && this.props.session_code && <h3>Code: <Badge color="secondary">{this.props.session_code}</Badge></h3>}
          {/* I regret this line of code */}
          {(this.state.isTrackListPage && this.props.hosted_session && (this.props.playlistId === this.props.hosted_session.playlistURI)) && !this.props.session_code &&<h3>Code: <Badge color="secondary">{this.props.hosted_session.joinCode}</Badge></h3>}

  
          {this.state.isPlaylsitPage && ( 
          <div>
            <Collapse isOpen={!this.state.seen}>
              <button
                className="btn-UpperCreate button button--loginApp-link"
                onClick={this.togglePop}
              >
                Create Playlist
              </button>
            </Collapse>
          </div>)}
        </Row>
        <Row style={{ margin: "auto", display: "block" }}>
        <Button color="primary" tag={Link} to={this.state.backLink}>
          {" "}
          Back{" "}
        </Button>
          {this.state.isTrackListPage && (
            <Button
              color="primary"
              style={{ marginLeft: 10 }}
              onClick={this.props.createSession}
            >
              Create Session!
            </Button>
          )}
        {this.state.isPlaylsitPage && (
          <Collapse isOpen={this.state.seen}>
            <Card
              style={{ backgroundColor: "transparent", borderWidth: "0" }}
              className={"inputListnameCard"}
            >
              <CardBody style={{ padding: "0px" }}>
                <form onSubmit={this.handleSubmit}>
                  <br />
                  <label>
                    <input
                      placeholder="Playlist Name"
                      type="text"
                      className={"playlistInput"}
                      value={this.state.listname}
                      onChange={this.handleChange}
                    />
                  </label>
                  <br />
                  <Button color="success" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <Button className={"closeBtn"} onClick={this.togglePop}>
                    Close
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Collapse>
        )}

        </Row>

      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    hosted_session: state.session.hosted_session ? state.session.hosted_session.data : null,
    session_code: state.playlists.active_playlist.session ? state.playlists.active_playlist.session.joinCode : '',
    activePlaylist: state.playlists.active_playlist,
    can_add:
      state.playlists.active_playlist.collaborative ||
      state.playlists.active_playlist.owner.id === state.user.data.id, //Only let them add songs if playlist is collab or theirs
    playlistId: window.location.pathname.split("/").pop(), //Grab playlist ID from URL
    deviceId: state.webplayer.deviceId,
    userID: state.user.data ? state.user.data.id : null,
   };
}

const mapDispatchToProps = {
  loadPlaylists,
  createPlaylist,
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoBar);
