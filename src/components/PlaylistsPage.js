import React, { Component } from "react";
import { loadPlaylists, createPlaylist } from "../redux/actions/thunk";
import { connect } from "react-redux";
import Playlists from "./Playlists/Playlists";
import { Link } from "react-router-dom";
import { Collapse, CardBody, Card } from "reactstrap";
import "./PopUP.css";
class PlaylistsPage extends Component {
  componentDidMount() {
    this.props.loadPlaylists();
  }

  state = {
    seen: false,
    listname: "",
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  constructor(props) {
    super(props);
    this.state = { listname: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ listname: event.target.value });
    console.log(this.state.listname);
  }

  handleSubmit(event) {
    console.log(this.state.listname + "final answer");
    alert("A playlist was submitted: " + this.state.listname);

    this.props.createPlaylist(this.props.userId, this.state.listname);
  }
  createPlaylist = () => {
    //This notation allows us to keep reference to this

    this.props.createPlaylist(this.props.userId, "this.props.state.value"); //All playlists called this until UI updated to let user enter name
  };

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
          <Card className={"addPlaylistCard"}>
            <CardBody>
              <form onSubmit={this.handleSubmit}>
                Name of your new playlist
                <br />
                <label>
                  <input
                    type="text"
                    value={this.state.listname}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <input type="submit" value="Submit" />
                <input type="button" value="Cancel" onClick={this.togglePop}/>
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
