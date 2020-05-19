import React, { Component } from "react";
import { loadPlaylists, createPlaylist } from "../redux/actions/thunk";
import { connect } from "react-redux";
import Playlists from "./Playlists/Playlists";
import { Link } from "react-router-dom";
import { Collapse, CardBody, Card, Button } from "reactstrap";
import { notify } from "react-notify-toast";
import "./PopUP.css";
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
    this.props.loadPlaylists();
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
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

  render() {
    return (
      <div>
        <Link to="/me">Back we go bois</Link>

        <Playlists title="Top playlists" col1Name="Name" col2Name="Songs" />
        <div>
          <Collapse isOpen={!this.state.seen}>
            <button
              className="button button--loginApp-link"
              onClick={this.togglePop}
            >
              Create Playlist
            </button>
          </Collapse>
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
                {/* <input type="submit" value="Submit" /> */}
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
