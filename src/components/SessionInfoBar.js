import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadPlaylists, createPlaylist } from "../redux/actions/thunk";
import { Button, Badge, Container, Row } from "reactstrap";

class SessionInfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      hostID: this.props.hostID,
      backLink: this.props.backLink,
      searchShowing: false,
      listname: "",
    };
  }

  toggleSearch = () => {
    this.setState({ searchShowing: !this.state.searchShowing });
    this.props.toggleSearch();
  };

  render() {
    return (
      <Container className="stickyContainer" fluid={true}>
        <Row style={{ display: "block" }}>
          {" "}
          <h1 className="playlistTitle">{this.state.title}</h1>
          <p>Host ID: {this.state.hostID}</p>
          {this.props.code && (
            <h3>
              Code: <Badge color="secondary">{this.props.code}</Badge>
            </h3>
          )}
        </Row>
        <Row style={{ margin: "auto", display: "inline" }}>
          {!this.state.searchShowing && <Button color="primary" tag={Link} to={this.state.backLink}>
            {" "}
            Back{" "}
          </Button>}
        </Row>
        <Button
          disabled={!this.props.can_add}
          className="addButton"
          style={{
            backgroundColor: "#c030ed",
            borderColor: "#c030ed",
            dsplay: "inline",
            marginBottom: "0px",
          }}
          onClick={this.toggleSearch}
        >
          {this.props.can_add
            ? this.state.searchShowing
              ? "Back to the playlist"
              : "Add track"
            : "Cannot add track"}
        </Button>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    code: window.location.pathname.split("/").pop(), //Grab playlist ID from URL
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
export default connect(mapStateToProps, mapDispatchToProps)(SessionInfoBar);
